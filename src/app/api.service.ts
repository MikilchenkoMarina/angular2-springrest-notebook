import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Note} from "./note";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  public getAllNotes(): Observable<Note[]> {
    return this.http.get(API_URL + '/notes')// return Observable
      .map(response => { // map observable to new Note Objects
        const notes = response.json();
        return notes.map((note) => new Note(note));
      }).catch(this.handleError);
  }


  public createNote(note: Note): Observable<Note> {
    return this.http.post(API_URL + '/notes', note)
      .map(response => {
        return new Note(response.json());
      })
      .catch(this.handleError);
  }

  public deleteNoteById(noteId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/notes/' + noteId)
      .map(response => null)
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
