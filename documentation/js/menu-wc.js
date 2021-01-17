'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">aida-next documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-cd29acfaf4aeb604af330dbdb299989c"' : 'data-target="#xs-components-links-module-AppModule-cd29acfaf4aeb604af330dbdb299989c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cd29acfaf4aeb604af330dbdb299989c"' :
                                            'id="xs-components-links-module-AppModule-cd29acfaf4aeb604af330dbdb299989c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainBodyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainBodyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuickMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuickMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubHeaderMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubHeaderMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link">AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthenticationModule-3f4b25a0cbdc723d4efeeb2c639f9ded"' : 'data-target="#xs-components-links-module-AuthenticationModule-3f4b25a0cbdc723d4efeeb2c639f9ded"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationModule-3f4b25a0cbdc723d4efeeb2c639f9ded"' :
                                            'id="xs-components-links-module-AuthenticationModule-3f4b25a0cbdc723d4efeeb2c639f9ded"' }>
                                            <li class="link">
                                                <a href="components/AuthenticationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthenticationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordStepFirstComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordStepFirstComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordStepSecondComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordStepSecondComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationRoutingModule.html" data-type="entity-link">AuthenticationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-79f9ef2bf6a258d4152be8f9ec182b52"' : 'data-target="#xs-components-links-module-DashboardModule-79f9ef2bf6a258d4152be8f9ec182b52"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-79f9ef2bf6a258d4152be8f9ec182b52"' :
                                            'id="xs-components-links-module-DashboardModule-79f9ef2bf6a258d4152be8f9ec182b52"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DriveModule.html" data-type="entity-link">DriveModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DriveModule-2e06dc37d08d290c5d4295503ca06d24"' : 'data-target="#xs-components-links-module-DriveModule-2e06dc37d08d290c5d4295503ca06d24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DriveModule-2e06dc37d08d290c5d4295503ca06d24"' :
                                            'id="xs-components-links-module-DriveModule-2e06dc37d08d290c5d4295503ca06d24"' }>
                                            <li class="link">
                                                <a href="components/DriveComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DriveComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DriveRoutingModule.html" data-type="entity-link">DriveRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GeneralSharedModule.html" data-type="entity-link">GeneralSharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GeneralSharedModule-da26f9b33b26762546536c0794994d58"' : 'data-target="#xs-components-links-module-GeneralSharedModule-da26f9b33b26762546536c0794994d58"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GeneralSharedModule-da26f9b33b26762546536c0794994d58"' :
                                            'id="xs-components-links-module-GeneralSharedModule-da26f9b33b26762546536c0794994d58"' }>
                                            <li class="link">
                                                <a href="components/EmailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralSharedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeneralSharedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeetingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeetingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhoneComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GeneralSharedRoutingModule.html" data-type="entity-link">GeneralSharedRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HelpModule.html" data-type="entity-link">HelpModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HelpModule-148d6c4f82f53eb1f05ce020caa1b1db"' : 'data-target="#xs-components-links-module-HelpModule-148d6c4f82f53eb1f05ce020caa1b1db"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpModule-148d6c4f82f53eb1f05ce020caa1b1db"' :
                                            'id="xs-components-links-module-HelpModule-148d6c4f82f53eb1f05ce020caa1b1db"' }>
                                            <li class="link">
                                                <a href="components/HelpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpRoutingModule.html" data-type="entity-link">HelpRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HumanResourceModule.html" data-type="entity-link">HumanResourceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HumanResourceModule-e18260f69a9731ddc5fd5adaaa452793"' : 'data-target="#xs-components-links-module-HumanResourceModule-e18260f69a9731ddc5fd5adaaa452793"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HumanResourceModule-e18260f69a9731ddc5fd5adaaa452793"' :
                                            'id="xs-components-links-module-HumanResourceModule-e18260f69a9731ddc5fd5adaaa452793"' }>
                                            <li class="link">
                                                <a href="components/HumanResourceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HumanResourceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HumanResourceRoutingModule.html" data-type="entity-link">HumanResourceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ListsModule.html" data-type="entity-link">ListsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ListsModule-69bbd427529cb291b9d6bc5ef7576f7c"' : 'data-target="#xs-components-links-module-ListsModule-69bbd427529cb291b9d6bc5ef7576f7c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ListsModule-69bbd427529cb291b9d6bc5ef7576f7c"' :
                                            'id="xs-components-links-module-ListsModule-69bbd427529cb291b9d6bc5ef7576f7c"' }>
                                            <li class="link">
                                                <a href="components/ListsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListsRoutingModule.html" data-type="entity-link">ListsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OpportunityModule.html" data-type="entity-link">OpportunityModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OpportunityModule-0fdce8009b8ac65ec08f885ab0b1a385"' : 'data-target="#xs-components-links-module-OpportunityModule-0fdce8009b8ac65ec08f885ab0b1a385"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OpportunityModule-0fdce8009b8ac65ec08f885ab0b1a385"' :
                                            'id="xs-components-links-module-OpportunityModule-0fdce8009b8ac65ec08f885ab0b1a385"' }>
                                            <li class="link">
                                                <a href="components/OpportunityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OpportunityComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpportunityRoutingModule.html" data-type="entity-link">OpportunityRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsModule.html" data-type="entity-link">ProjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProjectsModule-179f84f9d25baea8d86eaf21c8d324ad"' : 'data-target="#xs-components-links-module-ProjectsModule-179f84f9d25baea8d86eaf21c8d324ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectsModule-179f84f9d25baea8d86eaf21c8d324ad"' :
                                            'id="xs-components-links-module-ProjectsModule-179f84f9d25baea8d86eaf21c8d324ad"' }>
                                            <li class="link">
                                                <a href="components/ProjectsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsRoutingModule.html" data-type="entity-link">ProjectsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegistriesModule.html" data-type="entity-link">RegistriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegistriesModule-6ef1541534ab1cdaf1e3b8145938540a"' : 'data-target="#xs-components-links-module-RegistriesModule-6ef1541534ab1cdaf1e3b8145938540a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistriesModule-6ef1541534ab1cdaf1e3b8145938540a"' :
                                            'id="xs-components-links-module-RegistriesModule-6ef1541534ab1cdaf1e3b8145938540a"' }>
                                            <li class="link">
                                                <a href="components/ActivitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActivitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCompanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddCompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompaniesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompaniesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeetingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeetingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistriesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistriesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TasksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TenantComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TenantComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TenantsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TenantsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistriesRoutingModule.html" data-type="entity-link">RegistriesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' : 'data-target="#xs-components-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' :
                                            'id="xs-components-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' }>
                                            <li class="link">
                                                <a href="components/AidaLoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AidaLoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralEmailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeneralEmailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralPhoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeneralPhoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideSlideComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SideSlideComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' : 'data-target="#xs-injectables-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' :
                                        'id="xs-injectables-links-module-SharedModule-f7f86a7f52129b7ca796d5cf0ec8f738"' }>
                                        <li class="link">
                                            <a href="injectables/GetLoggedUserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GetLoggedUserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToastMessage.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ToastMessage</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TimeTrackingModule.html" data-type="entity-link">TimeTrackingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TimeTrackingModule-7181575eaa9985870fe36240df316d0e"' : 'data-target="#xs-components-links-module-TimeTrackingModule-7181575eaa9985870fe36240df316d0e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TimeTrackingModule-7181575eaa9985870fe36240df316d0e"' :
                                            'id="xs-components-links-module-TimeTrackingModule-7181575eaa9985870fe36240df316d0e"' }>
                                            <li class="link">
                                                <a href="components/TimeTrackingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeTrackingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TimeTrackingRoutingModule.html" data-type="entity-link">TimeTrackingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WebsiteModule.html" data-type="entity-link">WebsiteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WebsiteModule-de9db160d444f3fd9f21db2f191b562e"' : 'data-target="#xs-components-links-module-WebsiteModule-de9db160d444f3fd9f21db2f191b562e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WebsiteModule-de9db160d444f3fd9f21db2f191b562e"' :
                                            'id="xs-components-links-module-WebsiteModule-de9db160d444f3fd9f21db2f191b562e"' }>
                                            <li class="link">
                                                <a href="components/WebsiteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WebsiteComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebsiteRoutingModule.html" data-type="entity-link">WebsiteRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsSharedModule.html" data-type="entity-link">WidgetsSharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WidgetsSharedModule-0445839e660873eca74301915e50c51f"' : 'data-target="#xs-components-links-module-WidgetsSharedModule-0445839e660873eca74301915e50c51f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WidgetsSharedModule-0445839e660873eca74301915e50c51f"' :
                                            'id="xs-components-links-module-WidgetsSharedModule-0445839e660873eca74301915e50c51f"' }>
                                            <li class="link">
                                                <a href="components/AddWidgetsDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddWidgetsDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssociatedContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssociatedContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttachmentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AttachmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatedCompaniesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatedCompaniesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetsSharedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetsSharedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsSharedRoutingModule.html" data-type="entity-link">WidgetsSharedRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/HelpComponent-1.html" data-type="entity-link">HelpComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeetingComponent-1.html" data-type="entity-link">MeetingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotesComponent-1.html" data-type="entity-link">NotesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PhoneComponent-1.html" data-type="entity-link">PhoneComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Companies.html" data-type="entity-link">Companies</a>
                            </li>
                            <li class="link">
                                <a href="classes/Companies-1.html" data-type="entity-link">Companies</a>
                            </li>
                            <li class="link">
                                <a href="classes/Contacts.html" data-type="entity-link">Contacts</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompany.html" data-type="entity-link">CreateCompany</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContact.html" data-type="entity-link">CreateContact</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpInterceptorService.html" data-type="entity-link">HttpInterceptorService</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoggedInUser.html" data-type="entity-link">LoggedInUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/Managers.html" data-type="entity-link">Managers</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tenants.html" data-type="entity-link">Tenants</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetLoggedUserService.html" data-type="entity-link">GetLoggedUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegistriesService.html" data-type="entity-link">RegistriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SideSlideService.html" data-type="entity-link">SideSlideService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastMessage.html" data-type="entity-link">ToastMessage</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuardService.html" data-type="entity-link">LoginGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/decode.html" data-type="entity-link">decode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICompanyIndustries.html" data-type="entity-link">ICompanyIndustries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContacts.html" data-type="entity-link">IContacts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITenants.html" data-type="entity-link">ITenants</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});