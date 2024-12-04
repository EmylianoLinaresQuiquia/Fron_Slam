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
                    <a href="index.html" data-type="index-link">front-slan documentation</a>
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
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutsModule.html" data-type="entity-link" >LayoutsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SalesModule.html" data-type="entity-link" >SalesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SalesRoutingModule.html" data-type="entity-link" >SalesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-6e18ed77ccf04e7710cbd32fb9cb741d5a3942eaec396c0af969647ae916bdf0808efb1531e74e6e10090965068c09e9bc434d7240f8027875f5194e6fdf0df8"' : 'data-bs-target="#xs-components-links-module-SharedModule-6e18ed77ccf04e7710cbd32fb9cb741d5a3942eaec396c0af969647ae916bdf0808efb1531e74e6e10090965068c09e9bc434d7240f8027875f5194e6fdf0df8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-6e18ed77ccf04e7710cbd32fb9cb741d5a3942eaec396c0af969647ae916bdf0808efb1531e74e6e10090965068c09e9bc434d7240f8027875f5194e6fdf0df8"' :
                                            'id="xs-components-links-module-SharedModule-6e18ed77ccf04e7710cbd32fb9cb741d5a3942eaec396c0af969647ae916bdf0808efb1531e74e6e10090965068c09e9bc434d7240f8027875f5194e6fdf0df8"' }>
                                            <li class="link">
                                                <a href="components/ATMComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ATMComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdminHeaderComponent.html" data-type="entity-link" >AdminHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminLayoutComponent.html" data-type="entity-link" >AdminLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminSidebarComponent.html" data-type="entity-link" >AdminSidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CartComponent.html" data-type="entity-link" >CartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CatalogComponent.html" data-type="entity-link" >CatalogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategorieComponent.html" data-type="entity-link" >CategorieComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckoutComponent.html" data-type="entity-link" >CheckoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomersComponent.html" data-type="entity-link" >CustomersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DetailOrderComponent.html" data-type="entity-link" >DetailOrderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormCategoryComponent.html" data-type="entity-link" >FormCategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormCustomerComponent.html" data-type="entity-link" >FormCustomerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormProductComponent.html" data-type="entity-link" >FormProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListCategoryComponent.html" data-type="entity-link" >ListCategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListCustomerComponent.html" data-type="entity-link" >ListCustomerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListOrderComponent.html" data-type="entity-link" >ListOrderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListProductComponent.html" data-type="entity-link" >ListProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrderComponent.html" data-type="entity-link" >OrderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductComponent.html" data-type="entity-link" >ProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterComponent.html" data-type="entity-link" >RegisterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ReportComponent.html" data-type="entity-link" >ReportComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SalesFooterComponent.html" data-type="entity-link" >SalesFooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SalesHeaderComponent.html" data-type="entity-link" >SalesHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SalesLayoutComponent.html" data-type="entity-link" >SalesLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableComponent.html" data-type="entity-link" >TableComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/HighlightDirective.html" data-type="entity-link" >HighlightDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatalogService.html" data-type="entity-link" >CatalogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriaService.html" data-type="entity-link" >CategoriaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClienteService.html" data-type="entity-link" >ClienteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PedidoService.html" data-type="entity-link" >PedidoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductoService.html" data-type="entity-link" >ProductoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StyleManagerService.html" data-type="entity-link" >StyleManagerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Categoria.html" data-type="entity-link" >Categoria</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Client.html" data-type="entity-link" >Client</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cliente.html" data-type="entity-link" >Cliente</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cliente-1.html" data-type="entity-link" >Cliente</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DireccionEntrega.html" data-type="entity-link" >DireccionEntrega</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-1.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Order-1.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Order-2.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderItem.html" data-type="entity-link" >OrderItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pedido.html" data-type="entity-link" >Pedido</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PedidoRequest.html" data-type="entity-link" >PedidoRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product-1.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Producto.html" data-type="entity-link" >Producto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Producto-1.html" data-type="entity-link" >Producto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Productolist.html" data-type="entity-link" >Productolist</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductoPedido.html" data-type="entity-link" >ProductoPedido</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReporteVentas.html" data-type="entity-link" >ReporteVentas</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StatCard.html" data-type="entity-link" >StatCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StatCard-1.html" data-type="entity-link" >StatCard</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/CurrencyFormatPipe.html" data-type="entity-link" >CurrencyFormatPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});