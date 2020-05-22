package soldimet.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, soldimet.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, soldimet.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, soldimet.domain.User.class.getName());
            createCache(cm, soldimet.domain.Authority.class.getName());
            createCache(cm, soldimet.domain.User.class.getName() + ".authorities");
            createCache(cm, soldimet.domain.Aplicacion.class.getName());
            createCache(cm, soldimet.domain.Articulo.class.getName());
            createCache(cm, soldimet.domain.Banco.class.getName());
            createCache(cm, soldimet.domain.Caja.class.getName());
            createCache(cm, soldimet.domain.SubCategoria.class.getName());
            createCache(cm, soldimet.domain.CategoriaPago.class.getName());
            createCache(cm, soldimet.domain.CategoriaPago.class.getName() + ".subCategorias");
            createCache(cm, soldimet.domain.Cilindrada.class.getName());
            createCache(cm, soldimet.domain.Cliente.class.getName());
            createCache(cm, soldimet.domain.CostoOperacion.class.getName());
            createCache(cm, soldimet.domain.DetallePedido.class.getName());
            createCache(cm, soldimet.domain.DetallePedido.class.getName() + ".costoRepuestos");
            createCache(cm, soldimet.domain.DetallePresupuesto.class.getName());
            createCache(cm, soldimet.domain.DetallePresupuesto.class.getName() + ".cobranzaOperacions");
            createCache(cm, soldimet.domain.DetallePresupuesto.class.getName() + ".cobranzaRepuestos");
            createCache(cm, soldimet.domain.Direccion.class.getName());
            createCache(cm, soldimet.domain.Empleado.class.getName());
            createCache(cm, soldimet.domain.EstadoArticulo.class.getName());
            createCache(cm, soldimet.domain.EstadoCobranzaOperacion.class.getName());
            createCache(cm, soldimet.domain.EstadoDetallePedido.class.getName());
            createCache(cm, soldimet.domain.EstadoMovimiento.class.getName());
            createCache(cm, soldimet.domain.EstadoOperacion.class.getName());
            createCache(cm, soldimet.domain.EstadoPedidoRepuesto.class.getName());
            createCache(cm, soldimet.domain.EstadoPersona.class.getName());
            createCache(cm, soldimet.domain.EstadoPresupuesto.class.getName());
            createCache(cm, soldimet.domain.FormaDePago.class.getName());
            createCache(cm, soldimet.domain.HistorialPrecio.class.getName());
            createCache(cm, soldimet.domain.ListaPrecioDesdeHasta.class.getName());
            createCache(cm, soldimet.domain.ListaPrecioDesdeHasta.class.getName() + ".costoOperacions");
            createCache(cm, soldimet.domain.ListaPrecioRectificacionCRAM.class.getName());
            createCache(cm, soldimet.domain.ListaPrecioRectificacionCRAM.class.getName() + ".fechas");
            createCache(cm, soldimet.domain.Localidad.class.getName());
            createCache(cm, soldimet.domain.Marca.class.getName());
            createCache(cm, soldimet.domain.Motor.class.getName());
            createCache(cm, soldimet.domain.Motor.class.getName() + ".aplicacions");
            createCache(cm, soldimet.domain.Movimiento.class.getName());
            createCache(cm, soldimet.domain.Operacion.class.getName());
            createCache(cm, soldimet.domain.PagoCheque.class.getName());
            createCache(cm, soldimet.domain.PagoEfectivo.class.getName());
            createCache(cm, soldimet.domain.PagoTarjeta.class.getName());
            createCache(cm, soldimet.domain.PedidoRepuesto.class.getName());
            createCache(cm, soldimet.domain.PedidoRepuesto.class.getName() + ".detallePedidos");
            createCache(cm, soldimet.domain.Persona.class.getName());
            createCache(cm, soldimet.domain.PrecioRepuesto.class.getName());
            createCache(cm, soldimet.domain.Presupuesto.class.getName());
            createCache(cm, soldimet.domain.Presupuesto.class.getName() + ".detallePresupuestos");
            createCache(cm, soldimet.domain.Proveedor.class.getName());
            createCache(cm, soldimet.domain.Rubro.class.getName());
            createCache(cm, soldimet.domain.TipoDetalleMovimiento.class.getName());
            createCache(cm, soldimet.domain.TipoMovimiento.class.getName());
            createCache(cm, soldimet.domain.TipoParteMotor.class.getName());
            createCache(cm, soldimet.domain.TipoRepuesto.class.getName());
            createCache(cm, soldimet.domain.DetalleMovimiento.class.getName());
            createCache(cm, soldimet.domain.CobranzaOperacion.class.getName());
            createCache(cm, soldimet.domain.CobranzaRepuesto.class.getName());
            createCache(cm, soldimet.domain.CostoRepuesto.class.getName());
            createCache(cm, soldimet.domain.MovimientoArticulo.class.getName());
            createCache(cm, soldimet.domain.MovimientoPresupuesto.class.getName());
            createCache(cm, soldimet.domain.MovimientoPresupuesto.class.getName() + ".costoRepuestos");
            createCache(cm, soldimet.domain.MovimientoPedido.class.getName());
            createCache(cm, soldimet.domain.EstadoCostoRepuesto.class.getName());
            createCache(cm, soldimet.domain.DocumentationType.class.getName());
            createCache(cm, soldimet.domain.Sucursal.class.getName());
            createCache(cm, soldimet.domain.MedioDePago.class.getName());
            createCache(cm, soldimet.domain.MedioDePagoCheque.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
