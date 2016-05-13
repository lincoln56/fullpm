import PouchDB, { kenhqDb } from 'helper/pouchDb'

import {
  ISSUE_TYPE_BACKLOG,
  ISSUE_TYPE_DOING,
  ISSUE_TYPE_DONE
} from 'helper/constant'


export const CHANGE_TICKETS = 'CHANGE_TICKETS'

const ISSUE_TYPE_DICTIONARY = {
  1: ISSUE_TYPE_BACKLOG,
  2: ISSUE_TYPE_DOING,
  3: ISSUE_TYPE_DONE
}

export function fetchIssues() {
  const changeTickets = (dispatch) => {
    kenhqDb.allDocs({include_docs: true}).then(res => {
      const tickets = res.rows.map(d => d.doc)
      dispatch({ type: CHANGE_TICKETS, payload: tickets })
    })
  }

  return dispatch => {
    return PouchDB.sync('kenhq_meta', 'http://localhost:3000/proxy/meta').then(() => {
      kenhqDb.changes({
        since: 'now',
        live: true,
        allDocs: true
      }).on('change', function () {
        changeTickets(dispatch)
      })
      changeTickets(dispatch)
    })
  }
}

export function updateIssue(issueID, columnID) {
  //Maybe add some error handle here later.
  return () => {
    const issueType = ISSUE_TYPE_DICTIONARY[columnID]
    return kenhqDb.get(issueID).then(function (doc) {
      doc.column = issueType
      return kenhqDb.put(doc)
    })
    // return dispatch({
    //   type: UPDATE_TICKET,
    //   payload: { id: issueID, type: issueType }
    // })
  }
}