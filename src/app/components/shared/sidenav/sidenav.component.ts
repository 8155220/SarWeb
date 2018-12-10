import { OnInit } from '@angular/core';
import { VoluntarioService } from './../../../services/voluntario.service';
import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {VERSION, MatSidenav} from '@angular/material';
import { NavItem } from '../../../models/ui/nav-item';
import { UiService } from '../../../services/ui.service';
import { BreakpointObserver,Breakpoints } from '../../../../../node_modules/@angular/cdk/layout';
import { Observable, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit,OnInit {
  navItems: NavItem[] = [
    {
      displayName: 'Control Personal',
      iconName: 'recent_actors',
      children: [
        {
          displayName: 'Gestionar Voluntarios',
          iconName: 'group',
          route: '/dashboard/voluntarios/index',
        },
        {
          displayName: 'Gestionar Especialidad',
          iconName: 'speaker_notes',
          route: '/dashboard/especialidad/index',
        },
        {
          displayName: 'Gestionar Companias',
          iconName: 'feedback',
          route: '/dashboard/compania/index'
        },
        {
          displayName: 'Meritos',
          iconName: 'feedback',
          route: '/dashboard/merito/index'
        }
        ,
        {
          displayName: 'Demeritos',
          iconName: 'feedback',
          route: '/dashboard/demerito/index'
        }
        ,
        {
          displayName: 'Bajas',
          iconName: 'feedback',
          route: '/dashboard/baja/index'
        }
        ,
        {
          displayName: 'Incorporaciones',
          iconName: 'feedback',
          route: '/dashboard/incorporacion/index'
        }
        ,
        {
          displayName: 'Ascensos',
          iconName: 'feedback',
          route: '/dashboard/ascenso/index'
        }
        ,
      ]
    },
    {
      displayName: 'Control Personal',
      iconName: 'recent_actors',
      children: [
        {
          displayName: 'Gestionar Voluntarios',
          iconName: 'group',
          route: '/dashboard/voluntarios/index',
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    },
   
    {
      displayName: 'Disney',
      iconName: 'videocam',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'Orlando',
      iconName: 'movie_filter',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'Maleficent',
      disabled: true,
      iconName: 'report_problem',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    }
  ];
  @ViewChild('appDrawer') appDrawer: MatSidenav;
  version = VERSION;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      // map(result => result.matches)
      map(result => {
        console.log("result:" + result.matches);

        return result.matches;
      })
    );
    usuarioLogeado:any;

  constructor(public uiService:UiService,private breakpointObserver: BreakpointObserver,public personaService:VoluntarioService) { 
  }
  ngOnInit(){
    this.personaService.getPersonaLogInData().subscribe(e=>{
      this.usuarioLogeado=e[0];
    })
  }

  ngAfterViewInit() {
    console.log("Entro AfterViewInit");
    console.log(this.appDrawer);
    
    this.uiService.appDrawer = this.appDrawer;
  }

}
