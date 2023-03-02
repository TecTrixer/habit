// main.go
package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnRecordBeforeCreateRequest().Add(func(e *core.RecordCreateEvent) error {
		log.Println(e.Record) // still unsaved
		user := e.Record.Get("user")
		log.Println("userID:", user)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}