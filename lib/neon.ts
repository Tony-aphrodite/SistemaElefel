import postgres from 'postgres'

// Database connection for the licence server.
//
// Was @neondatabase/serverless, which speaks Neon's own protocol and therefore
// only ever works against a Neon endpoint. Pointing DATABASE_URL at Supabase
// made every query fail with a 500 while the data itself was perfectly
// readable — it looked like missing licences and was really a driver mismatch.
// postgres.js speaks plain PostgreSQL, so it works with Supabase and with Neon.
//
// Two settings are load-bearing:
//   prepare: false  Supabase's transaction pooler (:6543) has no prepared
//                   statements; without this it throws "prepared statement
//                   already exists". Harmless on a session/direct connection.
//   ssl: 'require'  Supabase refuses unencrypted connections, and the pooler
//                   URL does not always carry sslmode.
// The int8 parser keeps licence ids as strings, exactly as the Neon driver
// returned them, so nothing downstream changes behaviour.
//
// Cached across invocations: the module is re-used between warm serverless
// calls, so this avoids opening a new connection on every request.

// Same shape the Neon driver exposed (a tagged template resolving to rows), so
// lib/db.ts and every API route keep working untouched.
type Sql = (
  strings: TemplateStringsArray,
  ...params: unknown[]
) => Promise<Record<string, any>[]>

let client: ReturnType<typeof postgres> | undefined

export function getDb(): Sql {
  if (!client) {
    client = postgres(process.env.DATABASE_URL!, {
      prepare: false,
      ssl: 'require',
      types: {
        bigint: {
          to: 20,
          from: [20],
          serialize: (x: unknown) => String(x),
          parse: (x: string) => x,
        },
      },
    })
  }
  return client as unknown as Sql
}
