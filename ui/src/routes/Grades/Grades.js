import _ from 'lodash'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Icon } from 'react-fa'
import BreadcrumbChevron from '../../components/BreadcrumbChevron'
import PageFocusSection from '../../components/PageFocusSection'
import { log } from '../../utilities'

import '../../styles/components/c-breadcrumbs.css'
import '../../styles/buttons.css'

let backgroundImage = require('../../assets/clix-i2c-flowers.svg')

class Grades extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        pathname: `/subjects/${this.props.subject}`,
        state: { setFocus: true }
      }
    }
  }

  componentDidMount () {
    console.log('session id in grades', this.props.sessionId)
    if (!this.props.sessionId) {
      browserHistory.push('/')
    }
  }

  componentWillReceiveProps (nextProps) {

  }

  renderGrades = (gradeName, index) => {
    return <button className='choice-select'
      onClick={() => this._onHandleSelectGrade(gradeName)}>{gradeName}</button>
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
        docTitle={`${this.props.subjectName} | Clix Modules`}
        liveMessage='Select class page loaded.'
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
                    href='/subjects'>
                    {this.props.strings.breadcrumbs.selectSubject}
                  </a>
                </li>
                <li>
                  <BreadcrumbChevron />
                  <a onClick={this._onHandleSelectGrades}
                    href={`/subjects/${this.props.subjectName}`}
                    aria-current='page'>
                    {this.props.strings.breadcrumbs.selectClass}
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <main role='main' aria-label='content' id='main' tabIndex='-1' className='span_10_of_12 main-content'>
            <h1 className='pg-heading-1'>{this.props.strings.moduleNav.selectYourClass}</h1>
            <article className='choice-select__wrapper button-group' role='group'>
              {_.map(this.props.grades, this.renderGrades)}
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

  _onHandleSelectSubjects = () => {
    log({
      sessionId: this.props.sessionId,
      action: 'click',
      target: `Select Subjects`
    })
    browserHistory.push(`/subjects`)
  }

  _onHandleSelectGrade = (gradeName) => {
    log({
      sessionId: this.props.sessionId,
      action: 'click',
      target: `Grade: ${gradeName}`
    })
    browserHistory.push(`/subjects/${this.props.subjectName}/grades/${gradeName}`)
  }
}

Grades.propTypes = {
  grades      : React.PropTypes.object,
  strings     : React.PropTypes.object,
  subject     : React.PropTypes.string,
  subjectName : React.PropTypes.string,
  locale      : React.PropTypes.string,
  sessionId   : React.PropTypes.string
}

export default Grades
