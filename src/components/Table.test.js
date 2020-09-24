import React from 'react';
import { shallow } from 'enzyme';
import { Table } from './Table';
import { usersDiff } from '../lib/api/data';

describe('<Table />', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<Table data={usersDiff} />);
    });
  
    describe('render()', () => {
      it('renders the table container', () => {
        expect(wrapper.find('.table-container')).toHaveLength(1);
      });

      it('renders the correct amount of nodes', () => {
        expect(wrapper.find('.table-row')).toHaveLength(usersDiff.length);
      });

      it('renders the correct id', () => {
          expect(wrapper.find('.table-row').first().find('.table-item').at(1).text()).toEqual(usersDiff[0].id);
      })

    });
  });