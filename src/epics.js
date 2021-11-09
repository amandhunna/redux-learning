import {ajax} from 'rx/ajax';
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { FETCH_CHARACTERS, fetchCharactersFulfilled } from './action';

const END_POINT = 'http://star-war-chararcters.glitch.me/api/search/';

const fetchCharactersEpic = action$ => {
    return action$.pipe(
        ofType(FETCH_CHARACTERS),
        mergeMap(action => ajax
            .getJSON(END_POINT + action.payload.searchTerm)
            .pipe(map(response => fetchCharactersFulfilled(response)))
            )
    )
}

export default fetchCharactersEpic;
