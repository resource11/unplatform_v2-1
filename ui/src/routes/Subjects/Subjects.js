import _ from 'lodash'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Icon } from 'react-fa'
import BreadcrumbChevron from '../../components/BreadcrumbChevron'
import PageFocusSection from '../../components/PageFocusSection'
import { log } from '../../utilities'

import '../../styles/components/c-breadcrumbs.css'

let backgroundImage = require('../../assets/clix-i2c-flowers.svg')

class Subjects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        pathname: '/subjects',
        state: { setFocus: true }
      }
    }
  }

  componentDidMount () {
    if (!this.props.sessionId && !this.props.isSetSurveyInProgress) {
      browserHistory.push('/')
    }
  }

  componentWillReceiveProps (nextProps) {
  }

  renderSubjects = (subjectName, index) => {
    if (subjectName !== 'Tools') {
      return <button className='choice-select'
        onClick={() => this._onHandleSelectSubject(subjectName)}>{subjectName}</button>
    }
  }

  render () {
    if (!this.props.locale) {
      return (
        <div>
          <h1>Please set your school configuration at this <a href='/school'>link</a>.</h1>
        </div>
      )
    }

    return (
      <PageFocusSection
        docTitle='Select Subject | Clix Modules'
        liveMessage='Select subject page loaded.'
        location={this.state.location}
        locale={this.props.locale}
      >
        <div className='gradient-wrapper'>
          <img src={backgroundImage} alt='' aria-hidden className='gradient-wrapper__image' />
          <header role='banner' id='global-nav' tabIndex='-1' className='c-breadcrumbs__header'>
            <nav className='c-breadcrumbs__nav'>
              <ul className='c-breadcrumbs__list'>
                <li>
                  <Icon
                    name={'home'}
                    className='c-breadcrumb__icon'
                    aria-hidden
                    role='img'
                  />
                  <a onClick={this._onHandleSelectUser}
                    href='/'>
                    {this.props.strings.breadcrumbs.selectUser}
                  </a>
                </li>
                <li>
                  <BreadcrumbChevron />
                  <a onClick={this._onHandleSelectSubjects}
                    href='/subjects' aria-current='page'>
                    {this.props.strings.breadcrumbs.selectSubject}
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <main role='main' aria-label='content' id='main' tabIndex='-1' className='span_10_of_12 main-content'>
            <h1 className='pg-heading-1'>{this.props.strings.moduleNav.selectYourSubject}</h1>
            <article className='choice-select__wrapper button-group' role='group'>
              {_.map(this.props.subjects, this.renderSubjects)}
              <button className='choice-select'
                onClick={this._onHandleClickTools}>{this.props.strings.moduleNav.tools}</button>
            </article>
          </main>
        </div>
      </PageFocusSection>
    )
  }

  _onHandleSelectUser = (e) => {
    e.preventDefault()
    log({
      sessionId: this.props.sessionId,
      action: 'click',
      target: 'Select User'
    })
    browserHistory.push('/')
  }

  _onHandleSelectSubject = (subject) => {
    log({
      sessionId: this.props.sessionId,
      action: 'click',
      target: `Subject: ${subject}`
    })
    browserHistory.push(`/subjects/${subject}`)
  }

  _onHandleClickTools = () => {
    log({
      sessionId: this.props.sessionId,
      action: 'click',
      target: 'Tools'
    })
    browserHistory.push('/tools')
  }
}

Subjects.propTypes = {
  subjects              : React.PropTypes.object,
  strings               : React.PropTypes.object,
  locale                : React.PropTypes.string,
  sessionId             : React.PropTypes.string,
  isSetSurveyInProgress : React.PropTypes.bool
}

export default Subjects
