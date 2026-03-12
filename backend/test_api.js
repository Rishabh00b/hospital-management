async function runTests() {
  const API_URL = 'http://localhost:5000/api/patients';
  try {
    console.log('--- Starting API Tests (Native Fetch) ---');

    // 1. Register Patient
    console.log('\n1. Registering new patient...');
    const registerRes = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Patient',
        email: `test.${Date.now()}@example.com`,
        phoneNumber: '9876543210',
        age: 25,
        gender: 'Male',
        disease: 'Test Disease',
        doctorAssigned: 'Dr. tester',
        roomNumber: 'T1',
        patientType: 'Inpatient'
      })
    });
    const registerData = await registerRes.json();
    console.log('Success:', registerRes.status === 201 ? 'PASSED' : 'FAILED');
    const patientId = registerData._id;

    // 2. Get All Patients
    console.log('\n2. Getting all patients...');
    const getAllRes = await fetch(API_URL);
    const getAllData = await getAllRes.json();
    console.log('Success:', getAllRes.status === 200 ? 'PASSED' : 'FAILED');
    console.log('Patients count:', getAllData.length);

    // 3. Search Patient
    console.log('\n3. Searching for patient...');
    const searchRes = await fetch(`${API_URL}/search?name=Test`);
    const searchData = await searchRes.json();
    console.log('Success:', searchRes.status === 200 ? 'PASSED' : 'FAILED');
    console.log('Found:', searchData.some(p => p._id === patientId) ? 'PASSED' : 'FAILED');

    // 4. Update Patient
    console.log('\n4. Updating patient status...');
    const updateRes = await fetch(`${API_URL}/${patientId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Discharged' })
    });
    const updateData = await updateRes.json();
    console.log('Success:', updateData.status === 'Discharged' ? 'PASSED' : 'FAILED');

    // 5. Delete Patient
    console.log('\n5. Deleting patient...');
    const deleteRes = await fetch(`${API_URL}/${patientId}`, { method: 'DELETE' });
    console.log('Success:', deleteRes.status === 200 ? 'PASSED' : 'FAILED');

    console.log('\n--- All API Tests Completed Successfully ---');
  } catch (error) {
    console.error('\nTest Failed:', error.message);
  }
}

runTests();
