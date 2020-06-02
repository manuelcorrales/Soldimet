package soldimet.repository;

import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.TipoRepuesto;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the CobranzaRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobranzaRepuestoRepository extends JpaRepository<CobranzaRepuesto, Long> {

	List<CobranzaRepuesto> findDistinctByAplicacionAndCilindradaAndTipoRepuestoIn(Aplicacion aplicacion,
			Cilindrada cilindrada, List<TipoRepuesto> tipoRepuestos);

}
