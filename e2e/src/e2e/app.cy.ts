import { getButtons } from '../support/app.po';

describe('react-download', () => {
  beforeEach(() => cy.visit('/'));

  it('should have 3 download buttons', () => {
    getButtons().should('have.length', 3);
  });
});
