import assert from 'node:assert/strict';
import {classify,safeUrl,dedupKey} from '../lib/jobs.ts';
assert.equal(classify('Software Engineer','Civil engineering software'),null);
assert.equal(classify('Graduate Mechanical Engineer','CAD')?.branch,'Mechanical');
assert.equal(classify('Electrical Controls Engineer','')?.branch,'Electrical');
assert.equal(classify('Quantity Surveyor','')?.branch,'Civil');
assert.equal(classify('Engineer','General office duties'),null);
assert.equal(safeUrl('javascript:alert(1)'),null);
assert.equal(safeUrl('https://user:password@example.com'),null);
assert.equal(safeUrl('https://example.com/jobs'),'https://example.com/jobs');
assert.equal(dedupKey({company:'ACME Ltd',title:'Site Engineer',location:'Jaipur'}),dedupKey({company:'acme ltd.',title:'Site engineer',location:'JAIPUR'}));

console.log('8 classification, URL safety and deduplication assertions passed.');
