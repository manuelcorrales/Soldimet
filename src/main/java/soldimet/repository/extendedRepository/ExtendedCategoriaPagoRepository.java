package soldimet.repository.extendedRepository;

import soldimet.domain.CategoriaPago;
import soldimet.domain.SubCategoria;
import soldimet.repository.CategoriaPagoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoriaPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedCategoriaPagoRepository extends CategoriaPagoRepository {

    public CategoriaPago findBySubCategoriasContaining(SubCategoria subCategorias);

	public CategoriaPago findByNombreCategoriaPago(String cATEGORIA_PROVEEDORES);

}
