import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppInquiryUrl,
  calculateFobEstimate,
  createConfirmedRfqDossier,
  generateRfqReference,
  validateRfqInput,
  type RfqFormInput,
} from './rfq';

const validSampleInput: RfqFormInput = {
  divisions: ['gloves'],
  quantityTier: '100-300',
  materialTier: 'contact-4mm',
  brandName: 'Apex Goalkeeping UK',
  destinationCountry: 'Manchester, United Kingdom',
  contactName: 'Liam Vance',
  whatsappOrPhone: '+44 7911 123456',
  email: 'liam@apexgk.co.uk',
  projectNotes: 'Negative cut with 3D silicone punch zone',
};

test('calculateFobEstimate applies volume discounts and latex surcharge accurately', () => {
  const lowMoq = calculateFobEstimate(['gloves'], '50-100', 'contact-4mm');
  const bulk = calculateFobEstimate(['gloves'], '1000+', 'contact-4mm');

  assert.equal(lowMoq.unitRangeUsd[0], 16);
  assert.equal(lowMoq.unitRangeUsd[1], 20.5);
  assert.ok(bulk.unitRangeUsd[0] < lowMoq.unitRangeUsd[0]);
  assert.equal(bulk.estimatedUnits, 1200);
  assert.deepEqual(bulk.leadTimeDays, [30, 40]);
});

test('calculateFobEstimate handles apparel-only divisions without glove latex surcharge', () => {
  const teamwear = calculateFobEstimate(['teamwear'], '50-100', 'contact-4mm');
  assert.equal(teamwear.unitRangeUsd[0], 14);
  assert.equal(teamwear.unitRangeUsd[1], 19.5);
});

test('validateRfqInput catches missing required fields and malformed phone/email', () => {
  const invalid: RfqFormInput = {
    divisions: [],
    quantityTier: '50-100',
    materialTier: 'contact-4mm',
    brandName: '',
    destinationCountry: ' ',
    contactName: 'A',
    whatsappOrPhone: 'abc',
    email: 'not-an-email',
    projectNotes: '',
  };

  const errors = validateRfqInput(invalid);
  assert.ok(errors.divisions);
  assert.ok(errors.brandName);
  assert.ok(errors.destinationCountry);
  assert.ok(errors.contactName);
  assert.ok(errors.whatsappOrPhone);
  assert.ok(errors.email);
});

test('validateRfqInput passes with valid input and optional empty email', () => {
  const errors = validateRfqInput({ ...validSampleInput, email: '' });
  assert.deepEqual(errors, {});
});

test('createConfirmedRfqDossier produces deterministic reference ID and WhatsApp URL', () => {
  const fixedDate = new Date('2026-11-13T10:15:00Z');
  const ref = generateRfqReference('Apex Goalkeeping UK', fixedDate);
  assert.equal(ref, 'INTWO-APEX-261113-1015');

  const dossier = createConfirmedRfqDossier(validSampleInput, fixedDate);
  assert.equal(dossier.referenceId, ref);
  assert.ok(dossier.summaryText.includes('Apex Goalkeeping UK'));
  assert.ok(dossier.summaryText.includes('Negative cut with 3D silicone punch zone'));

  const expectedWa = buildWhatsAppInquiryUrl(dossier.summaryText);
  assert.equal(dossier.whatsappUrl, expectedWa);
  assert.ok(dossier.whatsappUrl.startsWith('https://wa.me/923005167080?text='));
});
