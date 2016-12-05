import { Ng2memoryPage } from './app.po';

describe('ng2memory App', function() {
  let page: Ng2memoryPage;

  beforeEach(() => {
    page = new Ng2memoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
