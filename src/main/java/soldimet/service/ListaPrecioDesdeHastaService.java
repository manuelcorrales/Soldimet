package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.repository.ListaPrecioDesdeHastaRepository;

/**
 * Service Implementation for managing {@link ListaPrecioDesdeHasta}.
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
     * @param listaPrecioDesdeHasta the entity to save.
     * @return the persisted entity.
     */
    public ListaPrecioDesdeHasta save(ListaPrecioDesdeHasta listaPrecioDesdeHasta) {
        log.debug("Request to save ListaPrecioDesdeHasta : {}", listaPrecioDesdeHasta);
        return listaPrecioDesdeHastaRepository.save(listaPrecioDesdeHasta);
    }

    /**
     * Partially update a listaPrecioDesdeHasta.
     *
     * @param listaPrecioDesdeHasta the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ListaPrecioDesdeHasta> partialUpdate(ListaPrecioDesdeHasta listaPrecioDesdeHasta) {
        log.debug("Request to partially update ListaPrecioDesdeHasta : {}", listaPrecioDesdeHasta);

        return listaPrecioDesdeHastaRepository
            .findById(listaPrecioDesdeHasta.getId())
            .map(
                existingListaPrecioDesdeHasta -> {
                    if (listaPrecioDesdeHasta.getFechaDesde() != null) {
                        existingListaPrecioDesdeHasta.setFechaDesde(listaPrecioDesdeHasta.getFechaDesde());
                    }
                    if (listaPrecioDesdeHasta.getFechaHasta() != null) {
                        existingListaPrecioDesdeHasta.setFechaHasta(listaPrecioDesdeHasta.getFechaHasta());
                    }

                    return existingListaPrecioDesdeHasta;
                }
            )
            .map(listaPrecioDesdeHastaRepository::save);
    }

    /**
     * Get all the listaPrecioDesdeHastas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ListaPrecioDesdeHasta> findAll() {
        log.debug("Request to get all ListaPrecioDesdeHastas");
        return listaPrecioDesdeHastaRepository.findAll();
    }

    /**
     * Get one listaPrecioDesdeHasta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ListaPrecioDesdeHasta> findOne(Long id) {
        log.debug("Request to get ListaPrecioDesdeHasta : {}", id);
        return listaPrecioDesdeHastaRepository.findById(id);
    }

    /**
     * Delete the listaPrecioDesdeHasta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ListaPrecioDesdeHasta : {}", id);
        listaPrecioDesdeHastaRepository.deleteById(id);
    }
}
