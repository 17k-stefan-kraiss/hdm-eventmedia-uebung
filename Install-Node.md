Bei der Installation von Node.js auf Windows kann es sein, dass die Berechtigung für das Ausführen von Skripten noch gesetzt werden muss.

Dazu wie folgt vorgehen:

1. Testen ob Berechtigungen gesetzt sind:

- Powershell, CMD oder Terminal in VSCode öffnen.
- folgendes eingeben:

`npm -v`

wenn hier eine Versionsnummer ausgegeben wird, passt alles und man kann hier aufhören.

Wenn hier ein rote Fehlermeldung auftaucht, bei 2. weitermachen

2. Berechtigung setzen:

Nun in der Commandline folgendes eingeben/kopieren

`Set-ExecutionPolicy RemoteSigned`

Im folgenden mit `A` bestätigen

3. Mit Schritt 1 prüfen, ob Berechtigung nun gesetzt ist. Ggf. Commandline/Terminal kurz schließen und neu öffnen um Änderungen anzuwenden.
