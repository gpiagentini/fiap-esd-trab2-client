import { Component, inject, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssetModel } from '../../models/asset-model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewAssetDialogComponent } from '../../components/new-asset-dialog/new-asset-dialog.component';
import { HttpService } from '../../services/http.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';





@Component({
  selector: 'app-asset-list',
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, FormsModule, MatSnackBarModule, MatListModule, MatCheckboxModule, MatCardModule,
    MatButtonModule, NavBarComponent, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.scss',
})
export class AssetListComponent {
  private snackBar = inject(MatSnackBar);

  constructor(private httpService: HttpService) { }

  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['select', 'asset', 'price'];
  dataSource = new MatTableDataSource<AssetModel>([]);
  selection = new SelectionModel<AssetModel>(true, []);
  loading: boolean = false;

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
    this.loading = true;
    this.httpService.getMyAssets().subscribe({
      next: (assets: AssetModel[]) => {
        this.dataSource = new MatTableDataSource<AssetModel>(assets);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Erro ao carregar ativos', 'Fechar', { duration: 2000 });
        this.loading = false;
      }
    });
  }

  removeAssets() {
    this.selection.selected.forEach(asset => {
      this.httpService.removeAssets(asset.asset).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(a => a != asset);
        },
        error: (error) => {
          this.snackBar.open('Erro ao excluir ativo ' + asset.asset, 'Fechar', { duration: 2000 });
        }
      });
    });
  }

  addAsset() {
    let dialogRef = this.dialog.open(NewAssetDialogComponent, {
      height: '300px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAssets();
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AssetModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.asset + 1}`;
  }
}
