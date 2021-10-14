package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;

/**
 * Service Implementation for managing {@link ListaPrecioRectificacionCRAM}.
 */
@Service
@Transactional
public class ListaPrecioRectificacionCRAMService {

    private final Logger log = LoggerFactory.getLogger(ListaPrecioRectificacionCRAMService.class);

    private final ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    public ListaPrecioRectificacionCRAMService(ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository) {
        this.listaPrecioRectificacionCRAMRepository = listaPrecioRectificacionCRAMRepository;
    }

    /**
     * Save a listaPrecioRectificacionCRAM.
     *
     * @param listaPrecioRectificacionCRAM the entity to save.
     * @return the persisted entity.
     */
    public ListaPrecioRectificacionCRAM save(ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM) {
        log.debug("Request to save ListaPrecioRectificacionCRAM : {}", listaPrecioRectificacionCRAM);
        return listaPrecioRectificacionCRAMRepository.save(listaPrecioRectificacionCRAM);
    }

    /**
     * Partially update a listaPrecioRectificacionCRAM.
     *
     * @param listaPrecioRectificacionCRAM the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ListaPrecioRectificacionCRAM> partialUpdate(ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM) {
        log.debug("Request to partially update ListaPrecioRectificacionCRAM : {}", listaPrecioRectificacionCRAM);

        return listaPrecioRectificacionCRAMRepository
            .findById(listaPrecioRectificacionCRAM.getId())
            .map(
                existingListaPrecioRectificacionCRAM -> {
                    if (listaPrecioRectificacionCRAM.getNumeroGrupo() != null) {
                        existingListaPrecioRectificacionCRAM.setNumeroGrupo(listaPrecioRectificacionCRAM.getNumeroGrupo());
                    }

                    return existingListaPrecioRectificacionCRAM;
                }
            )
            .map(listaPrecioRectificacionCRAMRepository::save);
    }

    /**
     * Get all the listaPrecioRectificacionCRAMS.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ListaPrecioRectificacionCRAM> findAll() {
        log.debug("Request to get all ListaPrecioRectificacionCRAMS");
        return listaPrecioRectificacionCRAMRepository.findAll();
    }

    /**
     * Get one listaPrecioRectificacionCRAM by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ListaPrecioRectificacionCRAM> findOne(Long id) {
        log.debug("Request to get ListaPrecioRectificacionCRAM : {}", id);
        return listaPrecioRectificacionCRAMRepository.findById(id);
    }

    /**
     * Delete the listaPrecioRectificacionCRAM by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ListaPrecioRectificacionCRAM : {}", id);
        listaPrecioRectificacionCRAMRepository.deleteById(id);
    }
}
