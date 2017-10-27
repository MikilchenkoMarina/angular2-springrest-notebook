import {Component, OnInit} from '@angular/core';
import {NoteDataService} from "./note-data.service";
import {Note} from "./note";

@Component({
  selector: 'app-root',
  template: `
<section class="noteapp">
    <h1>My Notes</h1>
    <div>
  <app-note-add (add)="onAddNote($event)" (alert)="onAlert($event)"></app-note-add>
  <app-note-list [notes]="notes" (removeNote)="onRemove($event)" ></app-note-list>
  </div>
</section>
`,
  styleUrls: ['styles.css'],
  providers: [NoteDataService]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private noteDataService: NoteDataService) {
  }
  notes: Note[] = [];

  public ngOnInit() {
    this.noteDataService.getAllNotes()
      .subscribe(
        (notes) => {
          this.notes = notes;
        }
      )
  }

onAddNote(note) {
    this.noteDataService
      .addNote(note)
      .subscribe(
        (newNote) => {
          this.notes = this.notes.concat(newNote);
        }
      );
  this.ngOnInit();
  }

  onRemove(note) {
    this.noteDataService
      .deleteNoteById(note.id)
      .subscribe(
        (_) => {
          this.notes = this.notes.filter((t) => t.id !== note.id);
        }
      );
  }

 onAlert(string:string){
    alert(string)
  }
}
