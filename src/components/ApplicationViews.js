import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import React, { Component } from "react"
// import ArticleList from "./articles/ArticlesList"
import ArticleManager from "./articles/ArticleManager"
// import ArticleForm from "./articles/ArticlesForm"
// import Article from "./articles/Articles"
import TaskManager from "./tasks/TaskManager"
// import TaskList from "./tasks/TaskList"
// import TaskForm from "./tasks/TaskForm"
// import Task from "./tasks/Task"
import EventManager from "./events/EventManager"
import EventList from "./events/EventsList"
import EventForm from "./events/EventsForm"
// import Event from "./events/Events"
import ChatManager from "./chat/ChatManager"
// import ChatList from "./chat/ChatList"
// import ChatForm from "./chat/ChatForm"
// import Chat from "./chat/Chat"
import FriendManager from "./friends/FriendManager"
// import EventList from "./events/EventsList";
// import EventForm from "./events/EventsForm";
// import FriendLists from "./friends/FriendList"
// import FriendForm from "./friends/FriendForm"
// import Friend from "./friends/Friend"

class ApplicationViews extends Component {
  state = {
    users: [],
    messages: [],
    articles: [],
    friends: [],
    tasks: [],
    events: []
  }

  componentDidMount() {
    const newState = {}

    ChatManager.getAll().then(messages => (newState.messages = messages))
    ArticleManager.getAll().then(articles => (newState.articles = articles))
    FriendManager.getAll().then(friends => (newState.friends = friends))
    TaskManager.getAll().then(tasks => (newState.tasks = tasks))
    EventManager.getAll().then(events => (newState.events = events))
      .then(() => this.setState(newState))
  }

  addTask = task =>
    TaskManager.post(task)
      .then(() => TaskManager.getAll())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )

  deleteTask = id => {
    return TaskManager.removeAndList(id).then(tasks => {
      this.props.history.push("/tasks")
      this.setState({ tasks: tasks })
    })
  }

  addEvent = event =>
    EventManager.postEvent(event)
      .then(() => EventManager.getAll())
      .then(events =>
        this.setState({
          events: events
        })
      )

  deleteEvent = id => {
    return EventManager.removeAndList(id).then(events => {
      this.props.history.push("/events")
      this.setState({ events: events })
    })
  }

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return null
            // Remove null and return the component which will handle authentication
          }}
        />

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          exact path="/events" render={props => {
            return <EventList {...props}
            deleteEvent={this.deleteEvent}
                events={this.state.events} />

          }}
        />
        <Route exact path="/events/new"
          render={props => {
            return <EventForm
                {...props}
                addEvent={this.addEvent} />
              }}
            />
        {/* <Route
          path="/tasks" render={props => {
            return (
              <TaskList
                {...props}
                deleteTask={this.deleteTask}
                // tasks={this.state.tasksName}
              />
            )
          }}
        /> */}
        {/* <Route
          path="/tasks/new"
          render={props => {
            return (
              <TaskForm
                {...props}
                addTask={this.addTask}
              />
            )
          }}
        /> */}
      </React.Fragment>
    );
  }
}
export default withRouter(ApplicationViews)