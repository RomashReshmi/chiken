import { Selector } from 'testcafe';

fixture`Poultry Farm Client App`
  .page('http://localhost:5173/');

test('Dashboard Loads', async t => {
  const title = Selector('h1').withText('Farm Dashboard');
  await t.expect(title.exists).ok();
});

test('Can navigate to Add Chicken form', async t => {
  const navLink = Selector('button').withText('Add New Record');
  await t.click(navLink);

  const formTitle = Selector('h1').withText('Add New Chicken');
  await t.expect(formTitle.exists).ok();
  
  const breedInput = Selector('input[type="text"]');
  await t.typeText(breedInput, 'Leghorn');
  
  const ageInput = Selector('input[type="number"]').nth(0);
  await t.typeText(ageInput, '20');
});

test('Can view Chickens List', async t => {
  const navLink = Selector('button').withText('Chickens Inventory');
  await t.click(navLink);

  const listTitle = Selector('h1').withText('Chickens Inventory');
  await t.expect(listTitle.exists).ok();
  
  const table = Selector('table');
  await t.expect(table.exists).ok();
});
