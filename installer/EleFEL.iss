; ═══════════════════════════════════════════════════════════════
;  EleFEL - Installer Script (Inno Setup 6)
;  Compila este archivo con Inno Setup para generar EleFEL-Setup.exe
; ═══════════════════════════════════════════════════════════════

#define MyAppName "EleFEL"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "EleFEL Guatemala"
#define MyAppURL "https://elefel.com"
#define MyAppExeName "EleFEL.App.exe"
#define PublishDir "..\publish"

[Setup]
; NOTA: AppId identifica la aplicación de forma única. NUNCA lo cambies
; entre versiones, o los usuarios tendrán dos instalaciones paralelas.
AppId={{8F4D2E71-9A3B-4C5D-B8E9-1F2A3B4C5D6E}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}

; Instalar en %LOCALAPPDATA%\Programs\EleFEL para NO requerir permisos
; de administrador. La app escribe config.json, Data\, Logs\, Invoices\
; junto al ejecutable, así que debe ir a un lugar con permisos de escritura.
DefaultDirName={localappdata}\Programs\EleFEL
DefaultGroupName=EleFEL
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog

; Salida del compilador
OutputDir=.\output
OutputBaseFilename=EleFEL-Setup
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern

; Arquitectura (x64 para .NET self-contained)
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

UninstallDisplayIcon={app}\{#MyAppExeName}
UninstallDisplayName={#MyAppName} {#MyAppVersion}

; Marca el ejecutable como "VersionInfo" para que Windows SmartScreen
; acumule reputación con el tiempo aunque no tengas code signing.
VersionInfoVersion={#MyAppVersion}
VersionInfoCompany={#MyAppPublisher}
VersionInfoDescription={#MyAppName} Setup
VersionInfoProductName={#MyAppName}

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
; Ejecutable principal (77 MB, self-contained .NET)
Source: "{#PublishDir}\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion

; config.json: SOLO si no existe. Protege la configuración del cliente
; en actualizaciones (NIT, claves de certificado, impresora, etc.)
Source: "{#PublishDir}\config.json"; DestDir: "{app}"; Flags: onlyifdoesntexist uninsneveruninstall

; Assets y fuentes
Source: "{#PublishDir}\Assets\*"; DestDir: "{app}\Assets"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "{#PublishDir}\LatoFont\*"; DestDir: "{app}\LatoFont"; Flags: ignoreversion recursesubdirs createallsubdirs

; NOTA: Los archivos .pdb NO se incluyen intencionalmente.
; Son símbolos de depuración y no deben distribuirse a clientes finales.

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#MyAppName}}"; Flags: nowait postinstall skipifsilent
