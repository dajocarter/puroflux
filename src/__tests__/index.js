import React from 'react'
import renderer from 'react-test-renderer'
import HomePage from '../pages/index'

describe("HomePage", () => {
	it("renders correctly", () => {
		const location = {
			pathname: "/"
		}

		const tree = renderer.create(<HomePage location={location} />).toJSON()
		expect(tree).toMatchSnapshot()
	})
})
