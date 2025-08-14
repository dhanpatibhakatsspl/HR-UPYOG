<%--
  ~    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
  ~    accountability and the service delivery of the government  organizations.
  ~
  ~     Copyright (C) 2017  eGovernments Foundation
  ~
  ~     The updated version of eGov suite of products as by eGovernments Foundation
  ~     is available at http://www.egovernments.org
  ~
  ~     This program is free software: you can redistribute it and/or modify
  ~     it under the terms of the GNU General Public License as published by
  ~     the Free Software Foundation, either version 3 of the License, or
  ~     any later version.
  ~
  ~     This program is distributed in the hope that it will be useful,
  ~     but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~     GNU General Public License for more details.
  ~
  ~     You should have received a copy of the GNU General Public License
  ~     along with this program. If not, see http://www.gnu.org/licenses/ or
  ~     http://www.gnu.org/licenses/gpl.html .
  ~
  ~     In addition to the terms of the GPL license to be adhered to in using this
  ~     program, the following additional terms are to be complied with:
  ~
  ~         1) All versions of this program, verbatim or modified must carry this
  ~            Legal Notice.
  ~            Further, all user interfaces, including but not limited to citizen facing interfaces,
  ~            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
  ~            derived works should carry eGovernments Foundation logo on the top right corner.
  ~
  ~            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
  ~            For any further queries on attribution, including queries on brand guidelines,
  ~            please contact contact@egovernments.org
  ~
  ~         2) Any misrepresentation of the origin of the material is prohibited. It
  ~            is required that all modified versions of this material be marked in
  ~            reasonable ways as different from the original version.
  ~
  ~         3) This license does not grant any rights to any user of the program
  ~            with regards to rights under trademark law for use of the trade names
  ~            or trademarks of eGovernments Foundation.
  ~
  ~   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
  ~
  --%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<script>
	function processRequest(){		
		console.log('posted the message');
	}
</script>
<style>
    table.upyog-table {
        border-collapse: collapse;
        width: -webkit-fill-available;
        table-layout: fixed;
        font-size: 13px;
        margin:20px;
    }
    table.upyog-table th{
       background-color: antiquewhite;
    }
    table.upyog-table th, table.upyog-table td {
        border: 1px solid black;
        padding: 6px;
        text-align: center;
        vertical-align: middle;
    }
    .rotate-text {
       /*  writing-mode: vertical-rl;
        transform: rotate(180deg); */
    }
</style>
<style>
    table.bill-table {
        border-collapse: collapse;
        width: -webkit-fill-available;
        font-size: 14px;
        table-layout: fixed;
        margin:20px;
    }
    table.bill-table th, table.bill-table td {
        border: 1px solid black;
        text-align: center;
        padding: 6px;
        vertical-align: middle;
    }
    table.bill-table th{
       background-color: antiquewhite;
    }
</style>
<style>
		 table.final-bill th{
		       background-color: antiquewhite;
		    }
        table.final-bill {
            border-collapse: collapse;
            width: -webkit-fill-available;
            font-size: 14px;
            margin-bottom: 20px;
            margin:20px;
        }
        table.final-bill th,
        table.final-bill td {
            border: 1px solid black;
            text-align: center;
            padding: 6px;
        }
        .remarks-cell {
            width: 12%;
        }
        .notes-section {
            font-size: 14px;
            line-height: 1.6;
        }
        .notes-section p {
            margin: 4px 0;
        }
    </style>
<div id="main">
<div class="row">
	<div class="col-md-12">
		<div class="panel panel-primary" data-collapsed="0">
			<div class="panel-heading">
				<div class="panel-title text-center">
					<c:out value="${message }" /><br />
					<c:forEach items="${basMessages }" var="basMessage">
						<c:out value="${basMessage }" /><br />
					</c:forEach>
				</div>
			</div>

			<!-- First Bill or First & Final Bill -->
			<c:if test="${billType == 'First Bill' || billType == 'First & Final Bill'}">
			    <table class="upyog-table" border="1" cellspacing="0" cellpadding="5">
			        <thead>
			            <tr>
			                <th rowspan="3">Date</th>
			                <th rowspan="3" class="rotate-text">Name of Contractor or Supplier and reference to agreement</th>
			                <th rowspan="3" class="rotate-text">Item of Work or Supplies (under “Sub-head” and “Sub-rule” of estimate)</th>
			                <th rowspan="3" class="rotate-text">Quantity</th>
			                <th rowspan="3" class="rotate-text">Rate<br>(₹)</th>
			                <th rowspan="3" class="rotate-text">Unit</th>
			                <th colspan="3" style="font-weight: bold;">Total amount payable to contractor or supplier</th>
			            </tr>
			            <tr>
			                <th rowspan="2">Amount<br>(₹)</th>
			                <th rowspan="2">In Figure</th>
			                <th rowspan="2">In Words</th>
			            </tr>
			        </thead>
			        <tbody>
			            <tr>
			                <td>${billDate}</td>
			                <td>${contractor.name}</td>
			                <td>${workOrder.name}</td>        
			                <td>180</td>
			                <td>₹920</td>
			                <td>sq.m</td>
			                <td>₹${contractorBill.passedamount}</td>
			                <td>₹${contractorBill.passedamount}</td>
			                <td>${amountInWords} Rupees Only /-</td>
			            </tr>
			        </tbody>
			    </table>
			</c:if>
			
			<!-- Running Bill -->
			<c:if test="${billType == 'Running Bill'}">
			    <table class="bill-table">
			        <tr>
			            <th rowspan="2">Unit</th>
			            <th rowspan="2">Quantity executed (or supplied) up to date as per measurement book</th>
			            <th rowspan="2">Items of works or supplies:<br>(grouped under sub works of estimate)</th>
			            <th rowspan="2">Rate</th>
			            <th colspan="2">Amount (₹)</th>
			            <th rowspan="2">Remarks</th>
			        </tr>
			        <tr>
			            <th>Up to date</th>
			            <th>Since previous bill (Total for each sub-head)</th>
			        </tr>
			        <tr>
			            <td>1 sq.m</td>
			            <td>250</td>
			            <td>Road Repair - Ward 12</td>
			            <td>₹480</td>
			            <td>₹120000</td>
			            <td>₹60000</td>
			            <td>Work ongoing</td>
			        </tr>
			    </table>
			</c:if>
			
			<!-- Final Bill -->
			<c:if test="${billType == 'Final Bill'}">
			    <table class="final-bill">
			        <tr>
			            <th rowspan="2">Unit</th>
			            <th rowspan="2">Quantity executed<br>(or supplied) up to date as per<br>measurement book</th>
			            <th rowspan="2">Items of Works or Supplies<br>(grouped under sub work of estimate)</th>
			            <th rowspan="2">Rate</th>
			            <th colspan="2">Amount (₹)</th>
			            <th rowspan="2" class="remarks-cell">Remarks</th>
			        </tr>
			        <tr>
			            <th>Up to Date</th>
			            <th>Since Previous Bill<br>(Total for each Sub-head)</th>
			        </tr>
			        <tr>
			            <td>1</td>
			            <td>2</td>
			            <td>3</td>
			            <td>4</td>
			            <td>5</td>
			            <td>6</td>
			            <td>7</td>
			        </tr>
			        <tr>
			            <td></td>
			            <td></td>
			            <th>Brought over</th>
			            <td></td>
			            <td></td>
			            <td></td>
			            <td></td>
			        </tr>
			        <tr>
			            <th colspan="4" style="text-align: left;">
			                <div class="notes-section">
			                    <p><strong>A.</strong> Total value of Work done or supplies made till date -</p>
			                    <p><strong>B.</strong> In Figure Rs 5300,<br>
			                    In Words Five Thousand Three Hundred Rupees Only.</p>
			                    <p><strong>C.</strong> Dated value of Work or supplies shown on previous bill -</p>
			                    <p>In Figures Rs. 39837,<br>
			                    In Words Thirty Nine Thousand Eight Hundred Thirty Seven Rupees Only.</p>
			                    <p><strong>D.</strong> Net value of work of supplies since previous bill -</p>
			                    <p>In Figures Rs. 8363,<br>
			                    In Words Eight Thousand Three Hundred Sixty Threes Rupees Only.</p>
			                </div>
			            </th>
			            <td></td>
			            <td></td>
			            <td></td>
			        </tr>
			    </table>
			</c:if>

			
		</div>
	</div>			
	<div class="text-center"><input type="button" name="button2" id="button2" value="Close" class="btn btn-default" onclick="window.parent.postMessage('close','*');window.close();"/></div>		
</div>					
</div>



