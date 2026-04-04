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

test('Fill in Add Chicken form and verify table update', async t => {
    await t
        .typeText('input[name="breed"]', 'Silkie')
        .typeText('input[name="age"]', '2')
        .typeText('input[name="health_status"]', 'Healthy')
        .typeText('input[name="egg_production_rate"]', '0.5')
        .click('button[type="submit"]')
        .expect(Selector('table').innerText).contains('Silkie'); 
});

test('Navigate to Chickens Inventory and verify data exists', async t => {
    const tableRowExists = Selector('table tbody tr').exists;
    const rowCount = Selector('table tbody tr').count;
    
    await t
        .expect(tableRowExists).ok('Table or rows do not exist holding inventory')
        .expect(rowCount).gte(1, 'Expected at least one row of data in the inventory table');
});
