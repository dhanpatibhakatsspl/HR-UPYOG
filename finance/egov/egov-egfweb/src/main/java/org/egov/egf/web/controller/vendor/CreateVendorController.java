package org.egov.egf.web.controller.vendor;
import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.egov.commons.dao.EgwStatusHibernateDAO;
import org.egov.egf.commons.bank.service.CreateBankService;
import org.egov.egf.masters.services.VendorService;
import org.egov.egf.web.adaptor.VendorJsonAdaptor;
import org.egov.model.masters.Vendor;
import org.egov.model.masters.VendorSearchRequest;
import org.egov.utils.FinancialConstants;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @author venki
 */

@Controller
@RequestMapping(value = "/vendor")
public class CreateVendorController {

	private static final String STR_VENDOR = "vendor";
	private static final String STR_VENDOR_SEARCH_REQUEST = "vendorSearchRequest";
	private static final String NEW = "vendor-new";
	private static final String RESULT = "vendor-result";
	private static final String EDIT = "vendor-edit";
	private static final String VIEW = "vendor-view";
	private static final String SEARCH = "vendor-search";

	@Autowired
	private CreateBankService createBankService;

	@Autowired
	private EgwStatusHibernateDAO egwStatusHibDAO;

	@Autowired
	private VendorService vendorService;

	@Autowired
	private MessageSource messageSource;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.setDisallowedFields("id");
	}

	private void prepareNewForm(final Model model) {
		model.addAttribute("banks", createBankService.getByIsActiveTrueOrderByName());
		model.addAttribute("statuses",
				egwStatusHibDAO.getStatusByModule(FinancialConstants.STATUS_MODULE_NAME_VENDOR));
		
		model.addAttribute("VendorCodeAutoGeneration",vendorService.fetchLastId());

	}

	@PostMapping(value = "/newform")
	public String showNewForm(@ModelAttribute(STR_VENDOR) final Vendor vendor, final Model model) {
		prepareNewForm(model);
		model.addAttribute(STR_VENDOR, new Vendor());
		return NEW;
	}

	@PostMapping(value = "/create")
	public String create(@Valid @ModelAttribute final Vendor vendor, final BindingResult errors,
			final Model model, final RedirectAttributes redirectAttrs) throws IOException {

		if (errors.hasErrors()) {
			prepareNewForm(model);
			return NEW;
		}
		String gstState = vendor.getGstRegisteredState().toUpperCase();
		vendor.setGstRegisteredState(gstState);
		String gst = vendor.getTinNumber().toUpperCase();
		vendor.setTinNumber(gst);
		

		vendorService.create(vendor);

		redirectAttrs.addFlashAttribute("message", messageSource.getMessage("msg.vendor.success", null, null));

		return "redirect:/vendor/result/" + vendor.getId() + "/create";
	}

	@GetMapping(value = "/edit/{id}")
	public String edit(@PathVariable("id") final Long id, final Model model) {
		final Vendor vendor = vendorService.getById(id);
		prepareNewForm(model);
		model.addAttribute(STR_VENDOR, vendor);
		return EDIT;
	}

	@PostMapping(value = "/update")
	public String update(@Valid @ModelAttribute final Vendor vendor, final BindingResult errors,
			final Model model, final RedirectAttributes redirectAttrs) {
		if (errors.hasErrors()) {
			prepareNewForm(model);
			return EDIT;
		}
		vendorService.update(vendor);
		redirectAttrs.addFlashAttribute("message", messageSource.getMessage("msg.vendor.success", null, null));
		return "redirect:/vendor/result/" + vendor.getId() + "/view";
	}

	@GetMapping(value = "/view/{id}")
	public String view(@PathVariable("id") final Long id, final Model model) {
		final Vendor vendor = vendorService.getById(id);
		prepareNewForm(model);
		model.addAttribute(STR_VENDOR, vendor);
		model.addAttribute("mode", "view");
		return VIEW;
	}

	@PostMapping(value = "/search/{mode}")
	public String search(@PathVariable("mode") @SafeHtml final String mode, final Model model) {
		final VendorSearchRequest vendorSearchRequest = new VendorSearchRequest();
		System.out.println("hello");
		prepareNewForm(model);
		model.addAttribute(STR_VENDOR_SEARCH_REQUEST, vendorSearchRequest);
		return SEARCH;

	}

	@PostMapping(value = "/ajaxsearch/{mode}", produces = MediaType.TEXT_PLAIN_VALUE)
	@ResponseBody
	public String ajaxsearch(@PathVariable("mode") @SafeHtml final String mode, final Model model,
			@Valid @ModelAttribute final VendorSearchRequest vendorSearchRequest) {
		final List<Vendor> searchResultList = vendorService.search(vendorSearchRequest);
		return new StringBuilder("{ \"data\":").append(toSearchResultJson(searchResultList)).append("}").toString();
	}

	public Object toSearchResultJson(final Object object) {
		final GsonBuilder gsonBuilder = new GsonBuilder();
		final Gson gson = gsonBuilder.registerTypeAdapter(Vendor.class, new VendorJsonAdaptor()).create();
		return gson.toJson(object);
	}

	@GetMapping(value = "/result/{id}/{mode}")
	public String result(@PathVariable("id") final Long id, @PathVariable("mode") @SafeHtml final String mode,
			final Model model) {
		final Vendor vendor = vendorService.getById(id);
		model.addAttribute(STR_VENDOR, vendor);
		model.addAttribute("mode", mode);
		return RESULT;
	}

}

