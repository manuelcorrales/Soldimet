package soldimet.service;

import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.repository.ListaPrecioDesdeHastaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ListaPrecioDesdeHasta.
 */
@Service
@Transactional
public class ListaPrecioDesdeHastaService {

    private final Logger log = LoggerFactory.getLogger(ListaPrecioDesdeHastaService.class);

    private final ListaPrecioDesdeHastaRepository listaPrecioDesdeHastaRepository;

    public ListaPrecioDesdeHastaService(ListaPrecioDesdeHastaRepository listaPrecioDesdeHastaRepository) {
        this.listaPrecioDesdeHastaRepository = listaPrecioDesdeHastaRepository;
    }

    /**
     * Save a listaPrecioDesdeHasta.
     *
     * @param listaPrecioDesdeHasta the entity to save
     * @return the persisted entity
     */
    public ListaPrecioDesdeHasta save(ListaPrecioDesdeHasta listaPrecioDesdeHasta) {
        log.debug("Request to save ListaPrecioDesdeHasta : {}", listaPrecioDesdeHasta);
        return listaPrecioDesdeHastaRepository.save(listaPrecioDesdeHasta);
    }

    /**
     *  Get all the listaPrecioDesdeHastas.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ListaPrecioDesdeHasta> findAll() {
        log.debug("Request to get all ListaPrecioDesdeHastas");
        return listaPrecioDesdeHastaRepository.findAll();
    }

    /**
     *  Get one listaPrecioDesdeHasta by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ListaPrecioDesdeHasta findOne(Long id) {
        log.debug("Request to get ListaPrecioDesdeHasta : {}", id);
        return listaPrecioDesdeHastaRepository.findOne(id);
    }

    /**
     *  Delete the  listaPrecioDesdeHasta by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ListaPrecioDesdeHasta : {}", id);
        listaPrecioDesdeHastaRepository.delete(id);
    }
}
