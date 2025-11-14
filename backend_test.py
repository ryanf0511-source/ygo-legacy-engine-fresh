#!/usr/bin/env python3
"""
Backend API Testing for Yu-Gi-Oh! SJC Database
Testing the Head-to-Head Builder endpoint: GET /api/decklists-by-event/{event}
"""

import requests
import json
import urllib.parse
from typing import Dict, Any, List

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    exit(1)

print(f"Testing backend at: {BACKEND_URL}")

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
    
    def add_pass(self, test_name: str):
        self.passed += 1
        print(f"✅ PASS: {test_name}")
    
    def add_fail(self, test_name: str, error: str):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ FAIL: {test_name} - {error}")
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY: {self.passed}/{total} tests passed")
        if self.errors:
            print(f"\nFAILED TESTS:")
            for error in self.errors:
                print(f"  - {error}")
        print(f"{'='*60}")

def test_decklists_by_event_endpoint():
    """Test the GET /api/decklists-by-event/{event} endpoint"""
    results = TestResults()
    
    # First, get available events to test with
    print("\n🔍 Getting available events for testing...")
    try:
        events_response = requests.get(f"{BACKEND_URL}/api/events", timeout=10)
        if events_response.status_code == 200:
            events_data = events_response.json()
            available_events = events_data.get('events', [])
            print(f"Found {len(available_events)} events in database")
            if available_events:
                print(f"Sample events: {available_events[:3]}")
        else:
            print(f"Warning: Could not fetch events list (status: {events_response.status_code})")
            available_events = ["SJC Anaheim 2004"]  # Fallback test event
    except Exception as e:
        print(f"Warning: Error fetching events: {e}")
        available_events = ["SJC Anaheim 2004"]  # Fallback test event
    
    # Test 1: Valid event name
    if available_events:
        test_event = available_events[0]
        print(f"\n🧪 Test 1: Valid event name - '{test_event}'")
        try:
            response = requests.get(f"{BACKEND_URL}/api/decklists-by-event/{urllib.parse.quote(test_event)}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if all(key in data for key in ['decklists', 'event', 'count']):
                    results.add_pass("Valid event - Response structure")
                else:
                    results.add_fail("Valid event - Response structure", f"Missing required keys. Got: {list(data.keys())}")
                
                # Check event field matches
                if data.get('event') == test_event:
                    results.add_pass("Valid event - Event field matches")
                else:
                    results.add_fail("Valid event - Event field matches", f"Expected '{test_event}', got '{data.get('event')}'")
                
                # Check count field
                decklists = data.get('decklists', [])
                expected_count = len(decklists)
                if data.get('count') == expected_count:
                    results.add_pass("Valid event - Count field accurate")
                else:
                    results.add_fail("Valid event - Count field accurate", f"Expected {expected_count}, got {data.get('count')}")
                
                # Check if decklists is a list
                if isinstance(decklists, list):
                    results.add_pass("Valid event - Decklists is array")
                else:
                    results.add_fail("Valid event - Decklists is array", f"Expected list, got {type(decklists)}")
                
                # Check sorting by player_name
                if len(decklists) > 1:
                    player_names = [deck.get('player_name', '') for deck in decklists]
                    sorted_names = sorted(player_names)
                    if player_names == sorted_names:
                        results.add_pass("Valid event - Sorted by player_name")
                    else:
                        results.add_fail("Valid event - Sorted by player_name", "Decklists not sorted by player_name")
                else:
                    results.add_pass("Valid event - Sorted by player_name (single/no decklist)")
                
                # Check decklist structure
                if decklists:
                    first_deck = decklists[0]
                    required_fields = ['player_name', 'deck_name', 'event', 'main_deck', 'extra_deck', 'side_deck']
                    if all(field in first_deck for field in required_fields):
                        results.add_pass("Valid event - Decklist structure")
                    else:
                        missing = [f for f in required_fields if f not in first_deck]
                        results.add_fail("Valid event - Decklist structure", f"Missing fields: {missing}")
                    
                    # Check card objects have card_type
                    all_cards = first_deck.get('main_deck', []) + first_deck.get('extra_deck', []) + first_deck.get('side_deck', [])
                    if all_cards:
                        card_with_type = any('card_type' in card for card in all_cards)
                        if card_with_type:
                            results.add_pass("Valid event - Cards contain card_type")
                        else:
                            results.add_fail("Valid event - Cards contain card_type", "No cards found with card_type field")
                    else:
                        results.add_pass("Valid event - Cards contain card_type (no cards to check)")
                
            elif response.status_code == 404:
                results.add_fail("Valid event", f"Got 404 for valid event '{test_event}' - may indicate no data")
            else:
                results.add_fail("Valid event", f"Unexpected status code: {response.status_code}")
                
        except Exception as e:
            results.add_fail("Valid event", f"Request failed: {str(e)}")
    
    # Test 2: URL-encoded event name with spaces
    print(f"\n🧪 Test 2: URL-encoded event name with spaces")
    test_event_with_spaces = "SJC Anaheim 2004"  # Event with spaces
    try:
        # Test both encoded and unencoded versions
        encoded_event = urllib.parse.quote(test_event_with_spaces)
        response = requests.get(f"{BACKEND_URL}/api/decklists-by-event/{encoded_event}", timeout=10)
        
        if response.status_code in [200, 404]:  # Both are acceptable
            results.add_pass("URL encoding - Request handled")
            if response.status_code == 200:
                data = response.json()
                if data.get('event') == test_event_with_spaces:
                    results.add_pass("URL encoding - Event name decoded correctly")
                else:
                    results.add_fail("URL encoding - Event name decoded", f"Expected '{test_event_with_spaces}', got '{data.get('event')}'")
        else:
            results.add_fail("URL encoding", f"Unexpected status code: {response.status_code}")
            
    except Exception as e:
        results.add_fail("URL encoding", f"Request failed: {str(e)}")
    
    # Test 3: Non-existent event (should return 404)
    print(f"\n🧪 Test 3: Non-existent event")
    fake_event = "Fake Event That Does Not Exist 9999"
    try:
        response = requests.get(f"{BACKEND_URL}/api/decklists-by-event/{urllib.parse.quote(fake_event)}", timeout=10)
        
        if response.status_code == 404:
            results.add_pass("Non-existent event - Returns 404")
            
            # Check if response has error detail
            try:
                error_data = response.json()
                if 'detail' in error_data:
                    results.add_pass("Non-existent event - Error detail provided")
                else:
                    results.add_fail("Non-existent event - Error detail", "No 'detail' field in error response")
            except:
                results.add_fail("Non-existent event - Error format", "Response not valid JSON")
                
        else:
            results.add_fail("Non-existent event", f"Expected 404, got {response.status_code}")
            
    except Exception as e:
        results.add_fail("Non-existent event", f"Request failed: {str(e)}")
    
    # Test 4: API endpoint accessibility
    print(f"\n🧪 Test 4: API endpoint accessibility")
    try:
        response = requests.get(f"{BACKEND_URL}/api/", timeout=10)
        if response.status_code == 200:
            results.add_pass("API accessibility - Root endpoint reachable")
        else:
            results.add_fail("API accessibility", f"Root endpoint returned {response.status_code}")
    except Exception as e:
        results.add_fail("API accessibility", f"Cannot reach API: {str(e)}")
    
    return results

if __name__ == "__main__":
    print("🚀 Starting Head-to-Head Builder Backend Tests")
    print(f"Target endpoint: GET /api/decklists-by-event/{{event}}")
    
    results = test_decklists_by_event_endpoint()
    results.summary()
    
    # Exit with error code if tests failed
    if results.failed > 0:
        exit(1)
    else:
        print("\n🎉 All tests passed!")
        exit(0)