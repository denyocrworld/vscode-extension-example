import * as vscode from "vscode";
var axios = require("axios");
var FormData = require("form-data");
var https = require("https");
var _ = require("lodash");

export async function wait(ms) {
  await timeout(ms);
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}
