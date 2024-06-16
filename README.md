# PL Extension README

## Übersicht

PL Extension ist eine JavaScript-Visual-Studio-Code (VS Code) Erweiterung, die zur Kommunikation mit dem PL-Backend verwendet wird. Diese Erweiterung ermöglicht es, Code in VS Code zu schreiben und über WebSockets im Frontend zu sehen und damit zu interagieren.

## Voraussetzungen

	•	Mac: Muss im Debug-Modus gestartet werden.
	•	Windows: Ähnliche Schritte wie bei Mac, aber verwenden Sie die entsprechenden Tastenkombinationen und stellen Sie sicher, dass Ihre Entwicklungsumgebung richtig konfiguriert ist.

## Installation

Da diese Erweiterung nicht im Microsoft Marketplace bereitgestellt wurde, müssen Sie sie als Entwickler starten.

	1.	Klonen Sie das Repository:
    ``` sh
    git clone <repository-url>
    cd pl-extension
    ```
    2.	Öffnen Sie das Projekt in VS Code:
    ``` sh
    code .
    ```
## Verwendung


	1.	Starten Sie die Erweiterung im Debug-Modus:
	•	Drücken Sie F5, um das Debugging zu starten. Dadurch wird ein neues VS Code-Entwicklungsfenster geöffnet.
	2.	Erstellen Sie im neuen Fenster eine neue Datei und schreiben Sie Ihren Code.
	3.	Schreiben Sie Ihren Code zwischen den Kommentaren #pl-start und #pl-end. Code außerhalb dieser Kommentare wird ignoriert.
	4.	Kommentare sollten der Syntax der aktuell verwendeten Programmiersprache folgen.
	5. ***Mac***:	Drücken Sie Cmd + Shift + P, um die Befehlspalette zu öffnen, geben Sie Connect ein und wählen Sie die Connect-Option, um eine Verbindung herzustellen.
	5. **Windows**	Drücken Sie Ctrl + Shift + P, um die Befehlspalette zu öffnen, geben Sie Connect ein und wählen Sie die Connect-Option, um eine Verbindung herzustellen.
	6.	Wenn die Verbindung hergestellt ist und das Frontend läuft, sollten alle Änderungen, die Sie am Code vornehmen, synchronisiert werden.

## Fehlerbehebung

	•	Stellen Sie sicher, dass das Frontend läuft.
	•	Überprüfen Sie den WebSocket-Verbindungsstatus in der VS Code-Ausgabekonsole.
	•	Stellen Sie sicher, dass der zu synchronisierende Code innerhalb der Kommentare #pl-start und #pl-end liegt.

## Hinweise

	•	Die Erweiterung muss manuell gestartet werden, da sie nicht Teil des Docker Compose Setups ist wie die anderen Module.

	•	Die Synchronisation funktioniert möglicherweise nicht perfekt aufgrund des manuellen Setups und des Debugging-Prozesses.
