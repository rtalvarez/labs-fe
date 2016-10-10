import { LabsFePage } from './app.po';

describe('labs-fe App', function() {
  let page: LabsFePage;

  beforeEach(() => {
    page = new LabsFePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
