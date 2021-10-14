package soldimet.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static soldimet.web.rest.TestUtil.createFormattingConversionService;

import io.micrometer.core.lang.Nullable;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;
import soldimet.SoldimetApp;
import soldimet.constant.Globales;
import soldimet.controller.PedidosController;
import soldimet.domain.Articulo;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Presupuesto;
import soldimet.domain.Proveedor;
import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.CostoRepuestoRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.service.PedidoRepuestoQueryService;
import soldimet.service.PedidoRepuestoService;
import soldimet.service.expertos.ExpertoPedidos;
import soldimet.web.rest.ArticuloResourceIT;
import soldimet.web.rest.CostoRepuestoResourceIT;
import soldimet.web.rest.DetallePedidoResourceIT;
import soldimet.web.rest.EstadoCostoRepuestoResourceIT;
import soldimet.web.rest.EstadoPedidoRepuestoResourceIT;
import soldimet.web.rest.PedidoRepuestoResource;
import soldimet.web.rest.PresupuestoResourceIT;
import soldimet.web.rest.ProveedorResourceIT;
import soldimet.web.rest.TestUtil;
import soldimet.web.rest.TipoRepuestoResourceIT;
import soldimet.web.rest.errors.ExceptionTranslator;

/**
 * Integration tests for the {@link PedidoRepuestoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class PedidoRepuestoTest {

    /*
     * Un pedido se crea si hay algun DetallePresupuesto con cobranza de repuestro
     * El pedido se crea solo con los detalles en estado pendiente de pedido
     * Los detalles no tienen costo de pedido (se crea cuando se hace)
     */

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_CREACION = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_PEDIDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PEDIDO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_PEDIDO = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_RECIBO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_RECIBO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_RECIBO = LocalDate.ofEpochDay(-1L);
    // @Autowired
    // private Globales globales;

    // @Autowired
    // private PedidoRepuestoRepository pedidoRepuestoRepository;

    // @Autowired
    // private ExtendedCostoRepuestoRepository costoRepuestoRepository;

    // @Autowired
    // private PedidoRepuestoService pedidoRepuestoService;

    // @Autowired
    // private ExpertoPedidos expertoPedidos;

    // @Autowired
    // private PedidoRepuestoQueryService pedidoRepuestoQueryService;

    // @Autowired
    // private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    // @Autowired
    // private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    // @Autowired
    // private ExceptionTranslator exceptionTranslator;

    // @Autowired
    // private EntityManager em;

    // @Autowired
    // private Validator validator;

    // private String controllerUrl = "/api/pedidos";

    // private MockMvc restPedidoRepuestoMockMvc;

    // private PedidoRepuesto pedidoRepuesto;

    // private CostoRepuesto costoRepuesto;

    // @BeforeEach
    // public void setup() {
    //     MockitoAnnotations.initMocks(this);
    //     final PedidosController pedidoRepuestoController = new PedidosController();
    //     this.restPedidoRepuestoMockMvc = MockMvcBuilders.standaloneSetup(pedidoRepuestoController)
    //         .setCustomArgumentResolvers(pageableArgumentResolver)
    //         .setControllerAdvice(exceptionTranslator)
    //         .setConversionService(createFormattingConversionService())
    //         .setMessageConverters(jacksonMessageConverter)
    //         .setValidator(validator).build();
    // }

    // /**
    //  * Create an entity for this test.
    //  *
    //  * This is a static method, as tests for other entities might also need it,
    //  * if they test an entity which requires the current entity.
    //  */
    // public static PedidoRepuesto createEntity(EntityManager em) {
    //     PedidoRepuesto pedidoRepuesto = new PedidoRepuesto()
    //         .fechaCreacion(DEFAULT_FECHA_CREACION)
    //         .fechaPedido(DEFAULT_FECHA_PEDIDO)
    //         .fechaRecibo(DEFAULT_FECHA_RECIBO);
    //     // Add required entity
    //     EstadoPedidoRepuesto estadoPedidoRepuesto;
    //     if (TestUtil.findAll(em, EstadoPedidoRepuesto.class).isEmpty()) {
    //         estadoPedidoRepuesto = EstadoPedidoRepuestoResourceIT.createEntity(em);
    //         estadoPedidoRepuesto.setNombreEstado("Pendiente de pedido");
    //         em.persist(estadoPedidoRepuesto);
    //         em.flush();
    //     } else {
    //         estadoPedidoRepuesto = TestUtil.findAll(em, EstadoPedidoRepuesto.class).get(0);
    //     }
    //     pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
    //     // Add required entity
    //     Presupuesto presupuesto;
    //     if (TestUtil.findAll(em, Presupuesto.class).isEmpty()) {
    //         presupuesto = PresupuestoResourceIT.createEntity(em);
    //         em.persist(presupuesto);
    //         em.flush();
    //     } else {
    //         presupuesto = TestUtil.findAll(em, Presupuesto.class).get(0);
    //     }
    //     pedidoRepuesto.setPresupuesto(presupuesto);

    //     DetallePedido detallePedido;
    //     if (TestUtil.findAll(em, DetallePedido.class).isEmpty()) {
    //         detallePedido = DetallePedidoResourceIT.createEntity(em);
    //         detallePedido.getEstadoDetallePedido().setNombreEstado("Pendiente de pedido");
    //         em.persist(detallePedido);
    //         em.flush();
    //     } else {
    //         detallePedido = TestUtil.findAll(em, DetallePedido.class).get(0);
    //     }
    //     pedidoRepuesto.getDetallePedidos().add(detallePedido);

    //     return pedidoRepuesto;
    // }

    // private Articulo getArticulo() {
    //     Articulo articulo;
    //     if (TestUtil.findAll(em, Articulo.class).isEmpty()) {
    //         articulo = ArticuloResourceIT.createEntity(em);
    //         em.persist(articulo);
    //         em.flush();
    //     } else {
    //         articulo = TestUtil.findAll(em, Articulo.class).get(0);
    //     }
    //     return articulo;

    // }

    // private TipoRepuesto getTipoRepuesto() {
    //     TipoRepuesto tipoRepuesto;
    //     if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
    //         tipoRepuesto = TipoRepuestoResourceIT.createEntity(em);
    //         em.persist(tipoRepuesto);
    //         em.flush();
    //     } else {
    //         tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
    //     }
    //     return tipoRepuesto;
    // }

    // private Proveedor getProveedor() {
    //     Proveedor proveedor;
    //     if (TestUtil.findAll(em, Proveedor.class).isEmpty()) {
    //         proveedor = ProveedorResourceIT.createEntity(em);
    //         em.persist(proveedor);
    //         em.flush();
    //     } else {
    //         proveedor = TestUtil.findAll(em, Proveedor.class).get(0);
    //     }
    //     return proveedor;
    // }

    // private EstadoCostoRepuesto getEstadoCostoRepuesto(String nombreEstado) {
    //     EstadoCostoRepuesto estadoCostoRepuesto = null;
    //     if (TestUtil.findAll(em, EstadoCostoRepuesto.class).isEmpty()) {
    //         if (nombreEstado != null) {
    //             estadoCostoRepuesto = EstadoCostoRepuestoResourceIT.createEntityConEstado(nombreEstado);
    //         } else {
    //             estadoCostoRepuesto = EstadoCostoRepuestoResourceIT.createEntity(em);
    //         }
    //         em.persist(estadoCostoRepuesto);
    //         em.flush();
    //     } else {
    //         List<EstadoCostoRepuesto> estados = TestUtil.findAll(em, EstadoCostoRepuesto.class);
    //         if (nombreEstado != null) {
    //             for (EstadoCostoRepuesto estado: estados){
    //                 if (estado.getNombreEstado().equals(nombreEstado)){
    //                     return estado;
    //                 }
    //             }
    //         } else {
    //             estadoCostoRepuesto = TestUtil.findAll(em, EstadoCostoRepuesto.class).get(0);
    //         }
    //     }
    //     return estadoCostoRepuesto;
    // }

    // private PedidoRepuestoTest newCostoRepuesto() {
    //     costoRepuesto = CostoRepuestoResourceIT.createEntity(em);
    //     return this;
    // }

    // private PedidoRepuestoTest addEstadoCostoRepuesto(String nombreEstado) {
    //     EstadoCostoRepuesto estadoCostoRepuesto = getEstadoCostoRepuesto(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO);
    //     costoRepuesto.setEstado(estadoCostoRepuesto);
    //     return this;
    // }
    // private PedidoRepuestoTest addProveedor(Proveedor proveedor) {
    //     costoRepuesto.setProveedor(proveedor);
    //     return this;
    // }
    // private PedidoRepuestoTest addTipoRepuesto(TipoRepuesto tipoRepuesto) {
    //     costoRepuesto.setTipoRepuesto(tipoRepuesto);
    //     return this;
    // }
    // private PedidoRepuestoTest addArticulo(Articulo articulo) {
    //     costoRepuesto.setArticulo(articulo);
    //     return this;
    // }

    // private CostoRepuesto persist() {
    //     em.persist(costoRepuesto);
    //     em.flush();
    //     return costoRepuesto;
    // }

    // @BeforeEach
    // public void initTest() {
    //     pedidoRepuesto = createEntity(em);
    // }

    // /*                                                                  Pedido      Detalle
    //     ESCENARIOS PEDIDO:
    //     0: 1 DETALLE(2 costo) -> PIDO 1                                 pParcial    pParcial
    //     1: 1 DETALLE(1 costo) -> PIDO 1                                 Pedido      Pedido
    //     2: 1 DETALLE(2 costo) CON 1 COSTO PEDIDO -> PIDO 1 + MAS        Pedido      Pedido
    //     4: 2 DETALLE(1 costo) -> PIDO 1                                 pParcial    pParcial
    //     4: 2 DETALLE 1 PEDIDO -> PIDO el otro                           Pedido      Pedido
    //     5: 1 DETALLE CON 1 COSTO RECIBIDO -> PIDO 1 MAS                 rParcial    pParcial
    // */

    // @Test@Transactional
    // public void updatePedidoRepuestoCrearCostoRepuestoPedido() throws Exception {
    //     /*
    //      * Ver que el costo repuesto se cree correctamente
    //      * que el estado del detalle sea Recibido
    //      * que el estado del pedido de Recibido
    //     */
    //     DetallePedido detallePedido = pedidoRepuesto.getDetallePedidos().iterator().next();
    //     String url = this.controllerUrl + "/updateDetallePedido/" + detallePedido.getId();

    //     CostoRepuesto costoRepuesto = newCostoRepuesto()
    //         .addEstadoCostoRepuesto(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO)
    //         .addArticulo(getArticulo())
    //         .addProveedor(getProveedor())
    //         .addTipoRepuesto(getTipoRepuesto())
    //         .persist();

    //     // Create the PedidoRepuesto
    //     restPedidoRepuestoMockMvc.perform(post(url)
    //         .contentType(TestUtil.APPLICATION_JSON_UTF8)
    //         .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
    //         .andExpect(status().isCreated());

    //     List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
    //     CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);

    //     assertThat(costoRepuesto.getArticulo()).isEqualTo(testCostoRepuesto.getArticulo().getId());
    //     assertThat(costoRepuesto.getTipoRepuesto()).isEqualTo(testCostoRepuesto.getTipoRepuesto().getId());
    //     assertThat(costoRepuesto.getProveedor()).isEqualTo(testCostoRepuesto.getProveedor().getId());
    //     assertThat(testCostoRepuesto.getEstado().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO);

    //     PedidoRepuesto pedidoRepuestoUpdate = pedidoRepuestoRepository.getOne(pedidoRepuesto.getId());
    //     assertThat(pedidoRepuestoUpdate.getDetallePedidos().iterator().next().getEstadoDetallePedido().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO);
    //     assertThat(pedidoRepuestoUpdate.getEstadoPedidoRepuesto().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO);

    // }

    // @Test@Transactional
    // public void updatePedidoRepuestoUnCostoRepuestoRecibido() throws Exception {
    //     /*
    //      * Ver que el costo repuesto se actualice correctamente
    //      * que el estado del detalle sea Recibido
    //      * que el estado del pedido de Recibido
    //     */
    //     DetallePedido detallePedido = pedidoRepuesto.getDetallePedidos().iterator().next();
    //     String url = this.controllerUrl + "/updateDetallePedido/" + detallePedido.getId();
    //     costoRepuesto = detallePedido.getCostoRepuestos().iterator().next();

    //     EstadoCostoRepuesto estadoRecibido = getEstadoCostoRepuesto(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO);
    //     costoRepuesto.setEstado(estadoRecibido);

    //     // Create the PedidoRepuesto
    //     restPedidoRepuestoMockMvc.perform(post(url)
    //         .contentType(TestUtil.APPLICATION_JSON_UTF8)
    //         .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
    //         .andExpect(status().isCreated());

    //     List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
    //     CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);

    //     assertThat(costoRepuesto.getArticulo()).isEqualTo(testCostoRepuesto.getArticulo().getId());
    //     assertThat(costoRepuesto.getTipoRepuesto()).isEqualTo(testCostoRepuesto.getTipoRepuesto().getId());
    //     assertThat(costoRepuesto.getProveedor()).isEqualTo(testCostoRepuesto.getProveedor().getId());
    //     assertThat(testCostoRepuesto.getEstado().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO);

    //     PedidoRepuesto pedidoRepuestoUpdate = pedidoRepuestoRepository.getOne(pedidoRepuesto.getId());
    //     assertThat(pedidoRepuestoUpdate.getDetallePedidos().iterator().next().getEstadoDetallePedido().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
    //     assertThat(pedidoRepuestoUpdate.getEstadoPedidoRepuesto().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);

    // }

    // @Test@Transactional
    // public void updatePedidoRepuestoEscenario0() throws Exception {
    //     DetallePedido detallePedido = pedidoRepuesto.getDetallePedidos().iterator().next();
    //     String url = this.controllerUrl + "/updateDetallePedido/" + detallePedido.getId();
    //     costoRepuesto = detallePedido.getCostoRepuestos().iterator().next();

    //     EstadoCostoRepuesto estadoRecibido = getEstadoCostoRepuesto(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO);
    //     costoRepuesto.setEstado(estadoRecibido);

    //     // Create the PedidoRepuesto
    //     restPedidoRepuestoMockMvc.perform(post(url)
    //         .contentType(TestUtil.APPLICATION_JSON_UTF8)
    //         .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
    //         .andExpect(status().isCreated());

    //     List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
    //     CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);

    //     assertThat(costoRepuesto.getArticulo()).isEqualTo(testCostoRepuesto.getArticulo().getId());
    //     assertThat(costoRepuesto.getTipoRepuesto()).isEqualTo(testCostoRepuesto.getTipoRepuesto().getId());
    //     assertThat(costoRepuesto.getProveedor()).isEqualTo(testCostoRepuesto.getProveedor().getId());
    //     assertThat(testCostoRepuesto.getEstado().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO);

    //     PedidoRepuesto pedidoRepuestoUpdate = pedidoRepuestoRepository.getOne(pedidoRepuesto.getId());
    //     assertThat(pedidoRepuestoUpdate.getDetallePedidos().iterator().next().getEstadoDetallePedido().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
    //     assertThat(pedidoRepuestoUpdate.getEstadoPedidoRepuesto().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);

    // }

    // /*
    //     ESCENARIOS RECIBO:
    //     2: 1 DETALLE CON 2 COSTOS PEDIDOS -> RECIBO 1                   rPArcial    Pedido
    //     3: 1 DETALLE 1 COSTO RECIBIDO Y 1 PEDIDO -> RECIBO EL OTRO      Recibido    Recibido
    //     4: 2 DETALLE CON 1 COSTO CADA 1 PEDIDO -> RECIBO 1              rParcial    Recibido
    //     5: 2 DETALLE CON 1 COSTO PEDIDO Y 1 RECIBIO -> RECIBO EL OTRO   Recibido    Recibido
    //     6: 1 DETALLE CON 3 COSTO PEDIDO -> RECIBO 1                     rPArcial    Pedido
    //     7: 1 DETALLE CON 2 PEDIDOS Y 1 RECIBIDO -> RECIBO EL 2          rPArcial    Pedido
    //     8: 1 DETALLE CON 2 RECIBIDOS Y 1 PEDIDO -> RECIBO EL 3          Recibido    Recibido
    // */
    // @Test@Transactional
    // public void updatePedidoRepuesto1Detalle2CostoRepuesto2Pedidos() throws Exception {
    //     /*
    //      * Este pedido tiene 2 costo repuestos
    //      * 1 Pasa a recibido y el otro se mantiene en pedido
    //      * EL detalle pedido se mantiene en pendiente
    //      * El pedido se cambia a estado Pedido Parcial
    //     */

    //     CostoRepuesto costoRepuesto = newCostoRepuesto()
    //         .addEstadoCostoRepuesto(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO)
    //         .addArticulo(getArticulo())
    //         .addProveedor(getProveedor())
    //         .addTipoRepuesto(getTipoRepuesto())
    //         .persist();

    //     // Agrego otro detalle con su costo al pedido de repuesto
    //     CostoRepuesto costoRepuesto2 = newCostoRepuesto()
    //         .addEstadoCostoRepuesto(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO)
    //         .addArticulo(getArticulo())
    //         .addProveedor(getProveedor())
    //         .addTipoRepuesto(getTipoRepuesto())
    //         .persist();
    //     DetallePedido detallePedido = pedidoRepuesto.getDetallePedidos().iterator().next();
    //     detallePedido.addCostoRepuesto(costoRepuesto);
    //     detallePedido.addCostoRepuesto(costoRepuesto2);

    //     pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
    //     em.persist(pedidoRepuesto);

    //     String url = this.controllerUrl + "/updateDetallePedido/" + detallePedido.getId();

    //     EstadoCostoRepuesto estadoRecibido = getEstadoCostoRepuesto(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO);
    //     costoRepuesto.setEstado(estadoRecibido);

    //     // Create the PedidoRepuesto
    //     restPedidoRepuestoMockMvc.perform(post(url)
    //         .contentType(TestUtil.APPLICATION_JSON_UTF8)
    //         .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
    //         .andExpect(status().isCreated());

    //         PedidoRepuesto pedidoRepuestoUpdate = pedidoRepuestoRepository.getOne(pedidoRepuesto.getId());
    //         assertThat(pedidoRepuestoUpdate.getDetallePedidos().iterator().next().getEstadoDetallePedido().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
    //         assertThat(pedidoRepuestoUpdate.getEstadoPedidoRepuesto().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);

    //     List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
    //     CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);

    //     assertThat(costoRepuesto.getArticulo()).isEqualTo(testCostoRepuesto.getArticulo().getId());
    //     assertThat(costoRepuesto.getTipoRepuesto()).isEqualTo(testCostoRepuesto.getTipoRepuesto().getId());
    //     assertThat(costoRepuesto.getProveedor()).isEqualTo(testCostoRepuesto.getProveedor().getId());
    //     assertThat(testCostoRepuesto.getEstado().getNombreEstado()).isEqualTo(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO);

    // }
}
