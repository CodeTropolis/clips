import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {

  // Get the children from ng-content. In this case, each TabComponent.
  // @ContentChildren(TabComponent) tabs:QueryList<TabComponent[]> = {}; // TS complains.
  // The initial value must be an instance of the QueryList object
  @ContentChildren(TabComponent) tabs:QueryList<TabComponent> = new QueryList();

  constructor() { }

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(tab => tab.active);
    if(!activeTabs || activeTabs.length == 0){
      // Set an active tab.
      // .first is available on the QueryList object.
      this.selectTab(this.tabs.first)
    }
  }

  selectTab(tab: TabComponent){
    this.tabs.forEach(tab => {
      // tab.component has @Input() active
      tab.active = false;
    });
    tab.active = true;
    return false; // remove # from URL.
  }

}
