Set objShell = CreateObject("Shell.Application")
Set objArgs = WScript.Arguments
command = "cmd /c """ & objArgs(0) & """"
objShell.ShellExecute "cmd.exe", "/c " & command, "", "runas", 1
