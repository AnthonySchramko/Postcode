package io.anthony.postcode.postcode;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import exceptions.NotFoundException;
import exceptions.ValidationException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/")
public class PostcodeController {
	
	@Autowired
	private PostcodeService postcodeService;
	
	@GetMapping
	public ResponseEntity<List<Postcode>> getAll(){
		List<Postcode> allPostcodes = this.postcodeService.getAll();
		
		return new ResponseEntity<>(allPostcodes, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Postcode> getById(@PathVariable Long id){
		Optional<Postcode> found = this.postcodeService.getById(id);
		
		if(found.isPresent()) {
			return new ResponseEntity<Postcode>(found.get(), HttpStatus.OK);
		}
		throw new NotFoundException(String.format("Postcode with id: %d does not exist. Unable to find postcode entry", id));
	}
	
	@PostMapping
	public ResponseEntity<?> createPostcode(@Valid @RequestBody PostcodeCreateDTO data){
		try {
			Postcode newPostcode = this.postcodeService.createPostcode(data);
			return new ResponseEntity<Postcode>(newPostcode, HttpStatus.CREATED);
		}
		catch(ValidationException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Postcode> deleteById(@PathVariable Long id){
		boolean deleted = this.postcodeService.deleteById(id);
		if(deleted==true) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		throw new NotFoundException(String.format("Postcode with id: %d does not exist. Unable to locate postcode entry",id));
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<?> updateById(@PathVariable Long id, @Valid @RequestBody PostcodeUpdateDTO data){
		try {
			Optional<Postcode> updated = this.postcodeService.updateById(id, data);
			
			if(updated.isPresent()) {
				return new ResponseEntity<Postcode>(updated.get(),HttpStatus.OK);
			}
			throw new NotFoundException(String.format("Postcode with id: %d does not exist. Unable to update postcode entry", id));
		}catch(ValidationException e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

}
