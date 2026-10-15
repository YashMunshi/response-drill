'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),E=require('../web/engine.js');
const copy=()=>structuredClone(E.initial);

test('Default exercise contains the account and revokes all sessions',()=>{const r=E.run(copy());assert.equal(r.report.after.enabled,false);assert.deepEqual(r.report.after.sessions,[]);assert.equal(r.metrics.containmentSeconds,90);});
test('Recovery requires credential rotation and validation',()=>{const x=copy();x.actions.push('rotate-credentials','validate-recovery','restore-account');const r=E.run(x);assert.equal(r.report.after.enabled,true);assert.equal(r.report.after.credentialVersion,2);assert.equal(r.report.validated,true);});
test('Restoring before validation is rejected',()=>{const x=copy();x.actions.push('restore-account');assert.throws(()=>E.run(x),/Validate recovery/);});
test('Revocation before evidence capture is rejected in this teaching sequence',()=>{const x=copy();x.actions=['revoke-sessions'];assert.throws(()=>E.run(x),/Capture evidence/);});
test('Timing is explicitly the configured exercise clock',()=>{const x=copy();x.stepSeconds=15;assert.equal(E.run(x).metrics.containmentSeconds,45);});
test('An invalid sequence does not partially mutate caller state',()=>{const x=copy(),before=JSON.stringify(x);x.actions.push('restore-account');const snapshot=JSON.stringify(x);assert.throws(()=>E.run(x));assert.equal(JSON.stringify(x),snapshot);assert.notEqual(before,snapshot);});
