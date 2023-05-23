import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent  implements OnInit {

  @ViewChild('searchBar') searchBar: IonSearchbar;
  constructor(
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.searchBar.setFocus();
  }

  onSearch(event) {
    // Implement your search logic here
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

  items: any[] = [
    { title: 'Item 1', tags: ['tag1', 'tag2'] },
    { title: 'Item 2', tags: ['tag2', 'tag3'] },
    { title: 'Item 3', tags: ['tag1', 'tag3'] },
  ];

  tags: string[] = ['tag1', 'tag2', 'tag3'];

  filteredItems: any[];
  selectedTags: string[] = [];

  searchQuery: string = '';

  searchItems() {
    this.filteredItems = this.items.filter(item => {
      // Check if item matches search query
      const matchesSearchQuery = item.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;

      // Check if item matches selected tags
      const matchesSelectedTags = this.selectedTags.every(tag => item.tags.indexOf(tag) !== -1);

      return matchesSearchQuery && matchesSelectedTags;
    });
  }

  selectTag(tag: string) {
    // Toggle selected tag
    const index = this.selectedTags.indexOf(tag);

    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }

    // Filter items based on selected tags
    this.searchItems();
  }

}
