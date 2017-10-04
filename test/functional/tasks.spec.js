
const Task = use('App/Models/Task')
const { test, trait } = use('Test/Suite')('Tasks')

/*
|--------------------------------------------------------------------------
| Browser
|--------------------------------------------------------------------------
|
| Browser trait makes it possible to interact with a real chrome browser
| and run assertions.
|
*/
trait('Test/Browser')

/*
|--------------------------------------------------------------------------
| Session Client
|--------------------------------------------------------------------------
|
| Session client trait is required to set sessions or run assertions
| on session values set by Adonis server.
|
*/
trait('Session/Client')

/*
|--------------------------------------------------------------------------
| Database transactions
|--------------------------------------------------------------------------
|
| Since we need fresh database state for each test, whether we can
| empty the database on each test or use transactions which are
| automatically rolled back after each test.
|
*/
trait('DatabaseTransactions')

test('see empty list when there are no tasks', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('No task created yet!')
})

test('title is required for creating new task', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.submitForm('form').waitForNavigation()
  page.session.assertError('title', 'required validation failed on title')
})

test('create a task with title', async ({ browser }) => {
  const page = await browser.visit('/')

  await page
    .type('[name="title"]', 'Eat breakfast on time')
    .submitForm('form')
    .waitForNavigation()

  page.session.assertOld('notification', 'Task added!')
  await page.assertHas('Eat breakfast on time')
})

test('see all previously created tasks', async ({ browser }) => {
  await Task.createMany([
    {
      title: 'Eat breakfast on time'
    },
    {
      title: 'Exercise at 7am'
    },
    {
      title: 'Brush teeth before going to bed'
    }
  ])

  const page = await browser.visit('/')
  await page
    .assertCount('tbody tr', 3) // 3 rows for 3 tasks
    .assertHasIn('tbody tr:nth-child(1) td:nth-child(2)', 'Eat breakfast on time')
    .assertHasIn('tbody tr:nth-child(2) td:nth-child(2)', 'Exercise at 7am')
    .assertHasIn('tbody tr:nth-child(3) td:nth-child(2)', 'Brush teeth before going to bed')
})

test('delete existing task', async ({ browser }) => {
  await Task.createMany([
    {
      title: 'Eat breakfast on time'
    },
    {
      title: 'Exercise at 7am'
    },
    {
      title: 'Brush teeth before going to bed'
    }
  ])

  const page = await browser.visit('/')
  await page
    .assertCount('tbody tr', 3) // 3 rows for 3 tasks
    .submitForm('tbody tr:nth-child(1) form')
    .waitForNavigation()
    .assertCount('tbody tr', 2) // 2 rows now
    .assertHasIn('tbody tr:nth-child(1) td:nth-child(2)', 'Exercise at 7am')
    .assertHasIn('tbody tr:nth-child(2) td:nth-child(2)', 'Brush teeth before going to bed')
})
