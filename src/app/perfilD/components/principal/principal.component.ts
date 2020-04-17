import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { DesignerService } from '../../../services/designer.service';
import { Designer } from '../../../models/designer';
import { Portafolio } from '../../../models/portafolio';
import { identity } from 'rxjs';

@Component({
  selector: 'perfil-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [DesignerService]
})
export class PrincipalComponent implements OnInit, DoCheck {
  public identity;
  public portOrabout;
  public p;
  public menu;
  public Alerta: boolean;
  public AlertaPerfil: boolean;
  public resultUpload;
  public filesToUpload;
  public portafolio: Portafolio;
  public respuesta;
  public portafolios: Portafolio[];
  public respuestaPorta;
  public AlertaDelete;
  public idP;
  public newFoto;
  public menuP: boolean;
  public menuResponsive: boolean;
  public resources;
  public menuMosaic: boolean;
  public openPortfolio: boolean;
  public urlPortafolio;

  constructor(
    private _designerService: DesignerService,
    private _route: Router,
    private _acRoute: ActivatedRoute
  ) {
    this.resources = GLOBAL.urlRecurso;
    this.identity = this._designerService.getIdentity();
    this.portOrabout = true;
    this.p = document.getElementsByClassName('aa1');
    this.menu = false;
    this.Alerta = false;
    this.AlertaPerfil = false;
    this.portafolio = new Portafolio('', this.identity.Documento_identidad, '');
    this.AlertaDelete = false;
    this.newFoto = this.identity;
    this.menuResponsive = false;
    this.menuMosaic = false;
  }

  ngOnInit() {
    this.p[2].classList.add('bordeado');
    this.optenerPortafolio();
  }

  abrirPortafolio() {
    this.portOrabout = true;
    this.p[2].classList.add('bordeado');
    this.p[3].classList.remove('bordeado');
  }

  abrirSobremi() {
    this.portOrabout = false;
    this.p[3].classList.add('bordeado');
    this.p[2].classList.remove('bordeado');
  }

  abrirMenu() {
    let mm = document.getElementById('cerrarmenu');
    if (this.menu == false) {
      this.menu = true;
      mm.classList.add('active');
    } else {
      this.menu = false;
      mm.classList.remove('active');
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.identity = null;
    this._route.navigate(['/home']);
  }

  ngDoCheck() {
    this.identity = this._designerService.getIdentity();
    if (this.identity == null) {
      this._route.navigate(['/home']);
    }
  }

  cerrarAlert() {
    this.Alerta = false;
    this.AlertaDelete = false;
    this.AlertaPerfil = false;
  }

  subirPorta() {
    if (this.filesToUpload && this.filesToUpload.length >= 1) {
      this._designerService.makeFileRequest(GLOBAL.url + 'upload-file-p', [], this.filesToUpload).then((result) => {
        console.log(result);
        this.resultUpload = result;
        this.portafolio.Nombre_portafolio = this.resultUpload.filename;
        this.infoPorta();


      }, (error) => {
        console.log(error);
      });
    } else {
      this.infoPorta();
    }
    this.Alerta = false;
  }

  infoPorta() {
    this._designerService.addPortafolio(this.portafolio).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.code == 200) {
          console.log('se ha subido la informacion del portafolio');
          this.optenerPortafolio();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editarFoto() {
    if (this.filesToUpload && this.filesToUpload.length >= 1) {
      this._designerService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).then((result) => {
        console.log(result);
        this.resultUpload = result;
        this.newFoto.foto_Disenador = this.resultUpload.filename;
        this.identity.Foto_Disenador = this.newFoto.Foto_Disenador;
        this.infoFoto();


      }, (error) => {
        console.log(error);
      });
    } else {
      this.infoFoto();
    }
    this.Alerta = false;
  }

  infoFoto() {
    let id = this.identity.Documento_identidad;
    this._designerService.updateFoto(this.newFoto, id).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.code == 200) {
          console.log('Se ha actualizado la foto');
          localStorage.removeItem('identity');
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.AlertaPerfil = false;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileToUpload(event) {
    this.filesToUpload = <Array<File>>event.target.files;
    console.log(this.filesToUpload);
    this.Alerta = true;
  }

  fileToUploadPerfil(event) {
    this.filesToUpload = <Array<File>>event.target.files;
    console.log(this.filesToUpload);
    this.AlertaPerfil = true;
  }

  optenerPortafolio() {
    let id = this.portafolio.Usuario_portafolio;
    this._designerService.getPortafolio(id).subscribe(
      response => {
        this.respuestaPorta = response;
        if (this.respuestaPorta.code == 200) {
          this.portafolios = this.respuestaPorta.data;
          console.log(this.portafolios);
        } else {
          this.portafolios = null;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deletePortafolio(idPort) {
    this.idP = idPort;
    console.log(this.idP);
    this.AlertaDelete = true;
  }

  eliminarPorta() {
    this._designerService.deletePortafolio(this.idP).subscribe(
      response => {
        this.optenerPortafolio();

      },
      error => {
        console.log(<any>error);
      }

    );
    this.AlertaDelete = false;
  }

  abrirMenuRes() {
    let t = document.getElementsByClassName('perfil-res');
    if (this.menuResponsive == false) {
      t[0].classList.add('active');
      this.menuResponsive = true;
    } else {
      t[0].classList.remove('active');
      this.menuResponsive = false;
    }
  }

  onShowMenuMosaic() {
    if (this.menuMosaic) {
      this.menuMosaic = false;
    }
    else {
      this.menuMosaic = true;
    }
  }

  onShowPortfolioImage(portafolio) {
    console.log(portafolio);
    let image = document.getElementById("imagePortfolio") as HTMLImageElement;
    this.urlPortafolio = GLOBAL.urlRecurso + "portafolios/" + portafolio.Nombre_foto_portafolio;
    if (this.openPortfolio) {
      this.openPortfolio = false;
    }
    else {
      this.openPortfolio = true;
    }
  }

}