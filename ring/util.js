/**
 * Util functions to search and remove data from data structures.
 * @author Alessandro Pio Ardizio
 * @since 0.1
 */
'use strict';

const Rx = require('@reactivex/rxjs');
const log = require('./logger');
const { MESSAGE_SEPARATOR } = require('./constants');

/**
 * Search a client by instance.
 * @param {*} id the client  to search
 * @param {Array} ds an array
 * @returns the entry in the map.
 */
let searchClient = (client, ds) => {
  let result;
  Rx.Observable.from(ds)
    .filter(e => e.client == client)
    .first()
    .subscribe(host => (result = host), e => log.error(e));
  return result;
};

/**
 * Search a client by client Id.
 * @param {*} priority the priority to search
 * @param {Array} ds an array
 * @returns the entry in the map.
 */
let searchClientByPriority = (priority, ds) => {
  let result;
  Rx.Observable
    .from(ds)
    .filter(e => e.priority == priority)
    .first()
    .subscribe(host => (result = host), e => log.error(e));
  return result;
};

/**
 * Search a client by client Id.
 * @param {int} id id to search
 * @param {Array} ds a map with id as keys.
 * @returns the entry in the map.
 */
let searchClientById = (id, ds) => {
  let result;
  Rx.Observable
  .from(ds)
    .filter(e => e.id == id)
    .first()
    .subscribe(host => (result = host), e => log.error(e));
  return result;
};

/**
 * Broadcast message to each node.
 * @param {Array} addresses , addresses in the cluster.
 * @param {Object} msg , message to sent in broadcast.
 */
let broadcastMessage = (addresses, msg) => {
  if (addresses.length > 0) {
    Rx.Observable.from(addresses).forEach(host => {
      host.client.write(JSON.stringify(msg) + MESSAGE_SEPARATOR);
    });
  }
};

module.exports = {
  searchClient: searchClient,
  searchClientByPriority: searchClientByPriority,
  searchClientById: searchClientById,
  broadcastMessage: broadcastMessage
};
