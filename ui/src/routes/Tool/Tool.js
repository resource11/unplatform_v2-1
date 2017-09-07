import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'
import { log } from '../../utilities'

// import '../../styles/buttons.css'
import '../../styles/components/c-header.css'
import '../../styles/components/c-activity.css'
import '../../styles/components/c-modal.css'

class Subjects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  componentDidMount () {
    if (!this.props.sessionId) {
      browserHistory.push('/')
    }
  }

  componentWillReceiveProps (nextProps) {

  }

  renderTool = (tool, index) => {
    return <button className='choice-select'
      onClick={() => this._onHandleSelectTool(tool)}>{tool}</button>
  }

  render () {
    if (!this.props.locale) {
      return (
        <div>
          <h1>Please set your school configuration at this <a href='/school'>link</a>.</h1>
        </div>
      )
    }

    let sessionModal

    if (this.state.showModal) {
      sessionModal = (
        <div className='c-modal__container'>
          <dialog open className='c-modal__dialog span_6_of_12'>
            <h2 className='c-modal__dialog-title'>{this.props.strings.unplatformNav.endSession}</h2>
            <form method='dialog'>
              <button value='close' onClick={this._onFinishLesson}>{this.props.strings.prompt.yes}</button>
              <button value='close' onClick={this._onToggleModal}>{this.props.strings.prompt.no}</button>
            </form>
          </dialog>
        </div>
      )
    }

    let toolUrl = `/common/${this.props.toolName}?lang=${this.props.locale}`
    return (
      <DocumentTitle title={`${this.props.toolName} | Clix Modules`}>
        <div className='act-container'>
          <header className='c-header'>
            <h1 className='c-header__logo'>CLIx Connected Learning Initiative</h1>
            <p className='c-header--unplat-v'>unplatform version {this.props.version}</p>
            <nav className='c-header__nav'>
              <a href='/tools'
                onClick={this._onChooseTool}>
                {this.props.strings.unplatformNav.chooseTool}</a>
              <a href='/subjects'
                onClick={this._onSelectSubject}>
                {this.props.strings.breadcrumbs.selectSubject}</a>
              <a href='/'
                onClick={this._onToggleModal}>
                {this.props.strings.unplatformNav.finishLesson}</a>
            </nav>
          </header>
          <main className='span_12_of_12' aria-label='content'>
            <iframe src={toolUrl}
              title={this.props.toolName}
              className='act-iframe--fill-win'
              frameBorder='0'
              allowFullScreen
            />
            {sessionModal}
          </main>
        </div>
      </DocumentTitle>
    )
  }

  _onFinishLesson = (e) => {
    e.preventDefault()
    log({
      sessionId: this.props.sessionId,
      appName: 'unplatform',
      action: 'clicked_finished',
      params: {
        url: `/tools/${this.props.toolName}`,
        response: 'yes'
      }
    })
    this.props.onFinish()
    browserHistory.push('/')
  }

  _onChooseTool = (e) => {
    e.preventDefault()
    log({
      sessionId: this.props.sessionId,
      appName: 'unplatform',
      action: 'clicked_choose_tool',
      params: {
        url: `/tools/${this.props.toolName}`
      }
    })
    browserHistory.push('/tools')
  }

  _onSelectSubject = (e) => {
    e.preventDefault()
    log({
      sessionId: this.props.sessionId,
      appName: 'unplatform',
      action: 'clicked_select_subject',
      params: {
        url: `/tools/${this.props.toolName}`
      }
    })
    browserHistory.push('/subjects')
  }

  _onToggleModal = (e) => {
    this.setState({ showModal: !this.state.showModal })
  }

}

export default Subjects
