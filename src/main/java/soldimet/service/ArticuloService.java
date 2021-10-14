package soldimet.service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Articulo;
import soldimet.repository.ArticuloRepository;

/**
 * Service Implementation for managing {@link Articulo}.
 */
@Service
@Transactional
public class ArticuloService {

    private final Logger log = LoggerFactory.getLogger(ArticuloService.class);

    private final ArticuloRepository articuloRepository;

    public ArticuloService(ArticuloRepository articuloRepository) {
        this.articuloRepository = articuloRepository;
    }

    /**
     * Save a articulo.
     *
     * @param articulo the entity to save.
     * @return the persisted entity.
     */
    public Articulo save(Articulo articulo) {
        log.debug("Request to save Articulo : {}", articulo);
        return articuloRepository.save(articulo);
    }

    /**
     * Partially update a articulo.
     *
     * @param articulo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Articulo> partialUpdate(Articulo articulo) {
        log.debug("Request to partially update Articulo : {}", articulo);

        return articuloRepository
            .findById(articulo.getId())
            .map(
                existingArticulo -> {
                    if (articulo.getCodigoArticuloProveedor() != null) {
                        existingArticulo.setCodigoArticuloProveedor(articulo.getCodigoArticuloProveedor());
                    }
                    if (articulo.getValor() != null) {
                        existingArticulo.setValor(articulo.getValor());
                    }
                    if (articulo.getFechaCosto() != null) {
                        existingArticulo.setFechaCosto(articulo.getFechaCosto());
                    }
                    if (articulo.getCostoProveedor() != null) {
                        existingArticulo.setCostoProveedor(articulo.getCostoProveedor());
                    }
                    if (articulo.getFechaCostoProveedor() != null) {
                        existingArticulo.setFechaCostoProveedor(articulo.getFechaCostoProveedor());
                    }

                    return existingArticulo;
                }
            )
            .map(articuloRepository::save);
    }

    /**
     * Get all the articulos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Articulo> findAll(Pageable pageable) {
        log.debug("Request to get all Articulos");
        return articuloRepository.findAll(pageable);
    }

    /**
     * Get one articulo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Articulo> findOne(Long id) {
        log.debug("Request to get Articulo : {}", id);
        return articuloRepository.findById(id);
    }

    /**
     * Delete the articulo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Articulo : {}", id);
        articuloRepository.deleteById(id);
    }
}
