package soldimet.service;

import soldimet.domain.Articulo;
import soldimet.repository.ArticuloRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Articulo.
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
     * @param articulo the entity to save
     * @return the persisted entity
     */
    public Articulo save(Articulo articulo) {
        log.debug("Request to save Articulo : {}", articulo);
        return articuloRepository.save(articulo);
    }

    /**
     *  Get all the articulos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Articulo> findAll(Pageable pageable) {
        log.debug("Request to get all Articulos");
        return articuloRepository.findAll(pageable);
    }

    /**
     *  Get one articulo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Articulo findOne(Long id) {
        log.debug("Request to get Articulo : {}", id);
        return articuloRepository.findOne(id);
    }

    /**
     *  Delete the  articulo by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Articulo : {}", id);
        articuloRepository.delete(id);
    }
}
