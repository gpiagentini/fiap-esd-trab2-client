import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-new-asset-dialog',
  imports: [MatButtonModule, MatInputModule, FormsModule, MatSnackBarModule],
  templateUrl: './new-asset-dialog.component.html',
  styleUrl: './new-asset-dialog.component.scss'
})
export class NewAssetDialogComponent implements OnInit {

  private snackBar = inject(MatSnackBar);
  assetName: string = '';

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  addAsset() {
    this.httpService.addAsset(this.assetName).subscribe({
      next: () => {
        this.snackBar.open(this.assetName + " adicionado com sucesso", "Fechar", { duration: 2000 });
        this.assetName = '';
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error, "Fechar", { duration: 2000 });
      }
    });
  }

}
