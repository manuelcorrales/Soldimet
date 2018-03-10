package soldimet.service.expertos;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ArchivoService {

    private String fileLocation;

    @PostMapping("/uploadExcelFile")
    public String uploadFile(Model model, MultipartFile file) throws IOException {
        InputStream in = file.getInputStream();
        File currDir = new File(".");
        String path = currDir.getAbsolutePath();
        fileLocation = path.substring(0, path.length() - 1) + file.getOriginalFilename();
        FileOutputStream f = new FileOutputStream(fileLocation);
        int ch = 0;
        while ((ch = in.read()) != -1) {
            f.write(ch);
        }
        f.flush();
        f.close();
        model.addAttribute("message", "File: " + file.getOriginalFilename()
            + " has been uploaded successfully!");
        return "excel";
    }

}
