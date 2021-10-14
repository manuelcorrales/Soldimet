package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CategoriaPago;
import soldimet.domain.SubCategoria;
import soldimet.repository.CategoriaPagoRepository;

/**
 * Spring Data  repository for the CategoriaPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedCategoriaPagoRepository extends CategoriaPagoRepository {
    public CategoriaPago findBySubCategoriasContaining(SubCategoria subCategorias);

    public CategoriaPago findByNombreCategoriaPago(String cATEGORIA_PROVEEDORES);
}
