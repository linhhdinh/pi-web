---
"@jmfederico/pi-web": patch
---

Fix terminal startup on macOS by restoring the execute bit on node-pty's spawn-helper during install.
