'use strict'

const Task = use('App/Models/Task')
const { validate } = use('Validator')

class TaskController {
    
    async index ({ view }) {
        const tasks = await Task.all()

        return view.render('tasks.index', { tasks: tasks.toJSON() })
    }

    async store ({ request, response, session }) {
        // validate form input
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255'
        })

        // show error messages upon validation fail
        if (validation.fails()) {
            session.withErrors(validation.messages())
                    .flashAll()

            return response.redirect('back')
        }
        
        request.input('title')
        // persist to database

        return response.redirect('back')
    }

    async destroy () {
        return 'back'
    }
}

module.exports = TaskController
