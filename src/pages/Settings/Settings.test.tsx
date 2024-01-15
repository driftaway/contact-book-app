import { render, screen, fireEvent, within } from '@testing-library/react';
import GlobalContext, { defaultState } from '../../context/globalContext';
import { MenuItem, Select } from '@mui/material';

test('renders Settings component without crashing', async () => {
  const contextValue = { 
    ...defaultState,
    selectedNationalities: [],
    setSelectedNationalities: () => {},
  };
  const OPTIONS = ['CH', 'ES', 'FR', 'GB'];
  const spyOnSelectChange = jest.fn();
  render(
    <GlobalContext.Provider value={contextValue}>
      <div data-testid='settings-test'>
        <div>
          <Select
            multiple
            value={contextValue?.selectedNationalities}
            data-testid='test-select'
            displayEmpty
            onChange={spyOnSelectChange}
          >
            <MenuItem style={{ display: 'none' }} disabled value=''>
            </MenuItem>

            {OPTIONS?.map((nationality) => (
              <MenuItem
                data-testid={`test-button-${nationality}`}
                key={nationality}
                value={nationality}
              >
                {nationality}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </GlobalContext.Provider>
  );

  const settingsComponent = screen.getByTestId('settings-test');
  expect(settingsComponent).toBeInTheDocument();
  fireEvent.mouseDown(screen.getByRole('combobox'));  
  const presentation = await screen.findByRole('presentation')
  expect(presentation).toBeInTheDocument();
  const listbox = within(presentation).getByRole('listbox')
  const options = within(listbox).getAllByRole('option');
  const optionValues = options.map((li) => li.getAttribute('data-value'));
  expect(optionValues).toEqual(['CH', 'ES', 'FR', 'GB']);
  const selectOption = within(presentation).getByTestId('test-button-GB');
  fireEvent.mouseDown(selectOption);
});
